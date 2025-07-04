require('dotenv').config();

import express, { type Request, type Response } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import jsonwebtoken from "jsonwebtoken"
const con = require('./demo_db_connection')

//import connection from "./demo_db_connection"
import { today, thisWeek, thisMonth, type Post } from "../posts"
import type { NewUser, User } from "../users"



const app = express()
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

const allPosts = [today, thisWeek, thisMonth];
const allUsers: User[] = [];

app.get("/posts", (req, res) => {
    req
    res.json(allPosts)
})

app.put<{}, {}, Post>("/posts", (req, res) => {
    const index = allPosts.findIndex(x => x.id === req.body.id)

    if (index === -1) {
        throw Error(`Post with id ${req.body.id} was not found`);
    }

    const existingPost = allPosts[index];

    allPosts[index] = { ...existingPost, ...req.body }
    
    res.json(allPosts[index]);
})

app.post<{}, {}, Post>("/posts", (req, res) => {
    const post = { ...req.body, id: (Math.random() * 100000).toFixed() }
    allPosts.push(post)
    res.json(post)
})

const SECRET: string = process.env.SECRET as string
const COOKIE: string = process.env.COOKIE as string
const ISSUER: string = process.env.ISSUER as string

function authenticate(id: string, req: Request, res: Response) {
    const token = jsonwebtoken.sign({ id }, SECRET, {
        issuer: ISSUER,
        expiresIn: '30 days'
    })

    //we need to add {httpOnly: true} back in for security
    res.cookie(COOKIE, token )
}

app.get("/current-user", (req, res) => {
    try {
        const token = req.cookies[COOKIE]
        const result = jsonwebtoken.verify(token, SECRET) as { id: string };

        res.json({ id: result.id });
    } catch (e) {
        res.status(404).end();
    }
})

app.post("/logout", (req, res) => {
    //we need to add {httpOnly: true} back in for security
    res.cookie(COOKIE, "");
    res.status(200).end();
})

app.post<{}, {}, NewUser>("/login", (req, res) => {
    const targetUser = allUsers.find(user => user.username === req.body.username);

    if (!targetUser || targetUser?.password !== req.body.password) {
        res.status(401).end();
    } else {
        authenticate(targetUser.id, req, res);
        res.status(200).end();
    }
})

app.post<{}, {}, NewUser>("/users", (req, res) => {
    const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() }
    allUsers.push(user);
    authenticate(user.id, req, res)
    const { password, ...rest } = user
    res.json(rest)
})

const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    let token = null;

    if (authHeader) {
        // Split the header into its parts
        const parts = authHeader.split(' ');

        // Check if the header follows the "Bearer <token>" format
        if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
            token = parts[1]; // Get the token

            if (token == null) {
                return res.sendStatus(401); // No token, unauthorized
            }

            jsonwebtoken.verify(token, SECRET, (err, user) => {
                if (err) {
                    return res.sendStatus(403); // Invalid token, forbidden
                }

                req.user = user;
                next(); // Token is valid, proceed to the next middleware or route handler
            });
        }
    } else {
        return res.sendStatus(401); // No token, unauthorized
    }
}

app.get('/summit-users', authenticateToken, (req, res) => {
    // Now, this route handler can assume the user is authenticated.
    // The authentication logic has been abstracted into the middleware.
    // Other routes can also reuse the 'authenticateUser' middleware.

    con.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

// app.get('/work-ticket', authenticateToken, (req, res) => {
//     // Now, this route handler can assume the user is authenticated.
//     // The authentication logic has been abstracted into the middleware.
//     // Other routes can also reuse the 'authenticateUser' middleware.
//     con.query('SELECT * FROM work_ticket', (err, results) => {
//         if (err) {
//             console.error('Error querying the database:', err);
//             res.status(500).send('Server error');
//             return;
//         }
//         res.json(results);
//     });
// });

app.get('/work-ticket/:id', authenticateToken, (req, res) => {
    // Now, this route handler can assume the user is authenticated.
    // The authentication logic has been abstracted into the middleware.
    // Other routes can also reuse the 'authenticateUser' middleware.
    const { id } = req.params;
    con.query('SELECT id, type, completion_time, payout, schedule,' +
                'status, access, property FROM work_ticket where property_id = ' + id, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

app.get('/work-properties', authenticateToken, (req, res) => {
    // Now, this route handler can assume the user is authenticated.
    // The authentication logic has been abstracted into the middleware.
    // Other routes can also reuse the 'authenticateUser' middleware.
    con.query('SELECT id, name, address, type FROM properties', (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

// app.get('/work-tasks', authenticateToken, (req, res) => {
//     // Now, this route handler can assume the user is authenticated.
//     // The authentication logic has been abstracted into the middleware.
//     // Other routes can also reuse the 'authenticateUser' middleware.

//     con.query('SELECT * from work_tasks where id ')
// })

app.listen(8000, () => {
    console.log('Listening on port 8000')
});