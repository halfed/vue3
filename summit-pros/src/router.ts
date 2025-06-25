import { createRouter, createWebHistory } from "vue-router"
import Home from "./views/Home.vue"
import NewPost from "./views/NewPost.vue"
import ShowPost from "./views/ShowPost.vue";
import EditPost from "./views/EditPost.vue";
import WorkTicket from "./views/WorkTicket.vue";
import Properties from "./views/Properties.vue";
import { useUsers } from "./stores/users";

export const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/posts/new",
        component: NewPost,
        beforeEnter: () => {
            const userStore = useUsers(); 
            if (!userStore.currentUserId) {
                return {
                    path: "/"
                }
            }
        }
    },
    {
        path: "/posts/:id/edit",
        component: EditPost,
    },
    {
        path: "/posts/:id",
        component: ShowPost,
    },
    {
        path: "/maintenance/work-ticket/:id",
        name: 'workTicket',
        component: WorkTicket,
    },
    {
        path: "/maintenance/properties",
        component: Properties,
    }
    ]


export const router = createRouter({
    history: createWebHistory(),
    routes,
})