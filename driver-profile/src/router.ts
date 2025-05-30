import { createRouter, createWebHistory } from "vue-router"
import Home from "./views/Home.vue"
import NewPost from "./views/NewPost.vue"
import ShowPost from "./views/ShowPost.vue";
import EditPost from "./views/EditPost.vue";
import { useUsers } from "./stores/users";
import DriverProfile from "./views/DriverProfile.vue";

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
        path: "/driver-profile",
        component: DriverProfile,
    }
    ]


export const router = createRouter({
    history: createWebHistory(),
    routes,
})