import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Navbar from './Navbar.vue';
import { computed, defineComponent, ref } from 'vue';
import { createPinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '../router';

//TYPE RECOMENDATIONS  -- .tsx
describe("Navbar", () => {

    it.only("renders", () => {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);

        const pinia = createPinia();
        const router = createRouter({
            history: createMemoryHistory(),
            routes,
        });
        
        const wrapper = mount(Navbar, {
            global: {
                plugins: [pinia, router]
            }
        });

        console.log(wrapper.html());
    });
});