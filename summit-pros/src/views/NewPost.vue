<script setup lang="ts">
import { DateTime } from "luxon";
import PostWriter from "../components/PostWriter.vue";
import type { Post, TimelinePost } from "../posts";
import { useUsers } from "../stores/users";
import { useRouter } from "vue-router";
import { usePosts } from "../stores/posts";

const userStore = useUsers();
const router = useRouter();
const postsStore = usePosts();

if(!userStore.currentUserId) {
        throw Error('User was not found');
}
    
const post: TimelinePost = {
    id: "-1",
    title: "Title",
    authorId: userStore.currentUserId,
    created: DateTime.now(),
    markdown: '## Title',
    html: '<h2>Title</h2>',
}

async function handleSubmit(post:Post) {
    await postsStore.createPost(post);
    router.push("/")
}
</script>

<template>
    New Post
    <PostWriter :post="post" @submit="handleSubmit"/>
</template>