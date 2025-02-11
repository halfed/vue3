import { mount } from '@vue/test-utils';
import { Pinia, createPinia, setActivePinia } from 'pinia';
import { Router, createMemoryHistory, createRouter } from 'vue-router';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import PostWriter from './PostWriter.vue';
import { routes } from '../router';
import { useUsers } from '../stores/users';

describe("PostWriter", () => {
    let pinia: Pinia;
    let router: Router;

    beforeEach(() => {
        pinia = createPinia();
        setActivePinia(pinia);
        const user = useUsers();
        user.currentUserId = "1";
        router = createRouter({
            history: createMemoryHistory(),
            routes,
        });
    });

    it("writes a post using markdown", () => {
        return new Promise<void>(async (resolve) => {
            const wrapper = mount(PostWriter, {
                global: {
                    plugins: [pinia, router],
                },
                props: {
                    post: {
                        id: "1",
                        title: "",
                        authorId: "2",
                        created: "",
                        markdown: "",
                        html: "",
                    }
                }
            });

            wrapper.find<HTMLDivElement>('#contenteditable')
                .element.innerText = '# Title';
            
            await wrapper.find('#contenteditable').trigger('input');
            

            setTimeout(async () => {
                await wrapper.find('#submit').trigger('click');
                console.log(wrapper.html());
                expect((wrapper.emitted().submit)[0])
                    .toMatchInlineSnapshot(`
                      [
                        {
                          "authorId": "1",
                          "created": "",
                          "html": "<h1 id=\\"title\\">Title</h1>
                      ",
                          "id": "1",
                          "markdown": "# Title",
                          "title": "",
                        },
                      ]
                    `);
                expect((wrapper.emitted().submit)[0]).toEqual(
                    [{
                        id: '1',
                        title: '',
                        authorId: '1',
                        created: '',
                        markdown: '# Title',
                        html: '<h1 id="title">Title</h1>\n'
                    }]
                )
                resolve();
            }, 300);
        });

        
    });

});