import { createRouter, createWebHistory } from "vue-router"
import Home from "./views/Home.vue"
import Home2 from "./views/Home2.vue"
import About from "./views/About.vue"
import PropertyMantenance from "./views/PropertyMaintenance.vue"
import Automotive from "./views/Automotive.vue"
import SoftwareEngineering from "./views/SoftwareEngineering.vue"
import NewPost from "./views/NewPost.vue"
import ShowPost from "./views/ShowPost.vue";
import EditPost from "./views/EditPost.vue";
import WorkTicket from "./views/WorkTicket.vue";
import Properties from "./views/Properties.vue";
import AddProperty from "./views/AddProperty.vue";
import { useUsers } from "./stores/users";

export const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/home",
        component: Home2,
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
        path: "/about",
        component: About,
    },
    {
        path: "/automotive",
        component: Automotive,
    },
    {
        path: "/propertymanagement",
        component: PropertyMantenance,
    },
    {
        path: "/softwareengineering",
        component: SoftwareEngineering,
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
    },
    {
        path: "/maintenance/add-property",
        component: AddProperty,
    }
    ]


export const router = createRouter({
    history: createWebHistory(),
    routes,
})