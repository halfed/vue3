<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue";
import { Post, TimelinePost } from "../posts";
import { useRouter } from "vue-router";
import { marked } from "marked";
import highlightjs from "highlight.js";
import debounce from "lodash/debounce";
import { usePosts } from "../stores/posts";
import { useUsers } from "../stores/users";


const props = defineProps < {
    post: Post | TimelinePost;
}>()

const emit = defineEmits<{
    (event: "submit", post: Post): void
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref('');
const contentEditable = ref<HTMLDivElement>();

// STORE
const posts = usePosts();
const router = useRouter();
const userStore = useUsers();


function parseHtml(markdown: string) {
     marked.parse(markdown, {
        gfm: true,
        breaks: true,
        highlight: (code) => {
            return highlightjs.highlightAuto(code).value
        },
    }, (err, parseResult) => {
        html.value = parseResult;
        console.log(parseResult);
    })
}

// BOTH HAVE THE SAME EFFECT OF WATCH
// watchEffect(() => {
//     marked.parse(content.value, {
//         gfm: true,
//         breaks: true,
//         highlight: (code) => {
//             return highlightjs.highlightAuto(code).value
//         },
//     }, (err, parseResult) => {
//         html.value = parseResult;
//         console.log(parseResult);
//     })
// })

watch(content, debounce((newContent) => {
    parseHtml(newContent) 
}, 250), {
    immediate: true,
})

onMounted(() => {
    if (!contentEditable.value) {
        throw Error('ContentEditable DOM nod was not found')
    }
    contentEditable.value.innerText = content.value;
})

function handleInput() {
    if (!contentEditable.value) {
        throw Error('ContentEditable DOM nod was not found')
    }

    content.value = contentEditable.value?.innerText
    
}

async function handleClick() {
    if(!userStore.currentUserId) {
        throw Error('User was not found');
    }

    const newPost: Post = {
        ...props.post,
        created: props.post.created === 'string' ? props.post.created : props.post.created.toString(),
        title: title.value,
        authorId: userStore.currentUserId,
        markdown: content.value,
        html: html.value,
    }
    // await posts.createPost(newPost);
    // router.push("/")
    // now we will emit the type of submit, edit / new post
    emit('submit', newPost);
}
</script>

<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post title</div>
                <input 
                type="text" 
                class="input" 
                v-model="title"/>
            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <div 
            id="contenteditable" 
            contenteditable 
            ref="contentEditable" 
            @input="handleInput" />
        </div>
        <div class="column">
            <div v-html="html" />
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <button 
            id="submit"
            class="button is-primary is-pulled-right"
            @click="handleClick">
                Save Post
            </button>
        </div>
    </div>
</template>