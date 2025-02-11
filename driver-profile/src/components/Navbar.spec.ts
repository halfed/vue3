import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Navbar from './Navbar.vue';
import { Pinia, createPinia, setActivePinia } from 'pinia';
import { Router, createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '../router';
import { useUsers } from '../stores/users';

vi.stubGlobal('fetch', vi.fn(() => {}))

//TYPE RECOMENDATIONS  -- .tsx
describe("Navbar", () => {
    let pinia: Pinia;
    let router: Router;

    beforeEach(() => {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);

        pinia = createPinia();
        setActivePinia(pinia);
        router = createRouter({
            history: createMemoryHistory(),
            routes,
        });
    });

    it("renders signin and signup buttons when not authenticated", () => {
        const wrapper = mount(Navbar, {
            global: {
                plugins: [pinia, router]
            }
        });

        
        expect(wrapper.find('#sign-up').exists()).toBe(true);

        expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true);
    });

    it.only("renders new post and logout buttons when authenticated", async () => {
        const users = useUsers();
        users.currentUserId = "1";
        
        const wrapper = mount(Navbar, {
            global: {
                plugins: [pinia, router]
            }
        });

        expect(wrapper.find('a').text()).toBe('New Post');
        expect(wrapper.find('button').text()).toBe('Log Out');

        await wrapper.find('#logout').trigger('click');

        expect(wrapper.find('#sign-up').exists()).toBe(true);

        expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true);

        await wrapper.find('[data-testid="sign-in"]').trigger('click');
        expect(document.body.querySelector('#signin-form')).toBeTruthy;
        console.log(document.body.outerHTML)
    });
});