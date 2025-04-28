import { createApp } from "vue"

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

        
//Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

import { VueCookieNext } from 'vue-cookie-next'

import { createPinia } from "pinia"
import { router } from "./router"
import App from './App.vue'
import { useUsers } from "./stores/users";
import { usePosts } from "./stores/posts";


const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp(App)
app.use(createPinia())
app.use(VueCookieNext)

app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'

const usersStore = useUsers();
const postsStore = usePosts();

Promise.all([
    usersStore.authenticate(),
    postsStore.fetchPosts(),
]).then(() => {
  app.use(router)
  app.use(vuetify)
  
  app.mount('#app')
})

VueCookieNext.config({ expire: '7d' })
VueCookieNext.setCookie('theme', 'default')
