import { defineStore } from "pinia";
import { NewUser } from "../users";

interface UsersState {
    currentUserId?: string
}

export const useUsers = defineStore("users", {
    state: (): UsersState => ({
        currentUserId: undefined,
    }),

    actions: {
        async authenticate() {
            // THIS TIME OUT IS TO TEST OUT A RACE CONDITION ISSUE FOR HOMEWORK
            // setTimeout(async () => {
                try {
                    const res = await window.fetch("/api/current-user", {
                        headers: {
                        'Content-Type': 'application/json',
                        }
                    })
                const result = await res.json();
                this.currentUserId = result.id;
                } catch (e) {
                    this.currentUserId = undefined;
                }
            // }, 1000)
        },
        
        async logout() {
            await window.fetch("/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            return this.authenticate();
        },

        async createUser(newUser: NewUser) {
            const body = JSON.stringify(newUser)
            await window.fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            })
            return this.authenticate();
        }
    }
})
