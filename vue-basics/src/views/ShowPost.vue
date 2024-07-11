<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { usePosts } from '../stores/posts';
import { useUsers } from '../stores/users';
import { computed } from 'vue';


const route = useRoute();
const postsStore = usePosts();
const userStrore = useUsers();
const id = route.params.id as string;

const post = postsStore.all.get(id);

if (!post) {
    throw new Error(`Post with id ${id} was not found`);  
}

const canEdit = computed(() => {
    if (!userStrore.currentUserId) {
        return false;
    }

    if (userStrore.currentUserId !== post.authorId) {
        return false;
    }

    return true;
})
</script>

<template>
    <div class="columns">
        <div class="column"></div>
        <div class="column is-two-thirds">
            <RouterLink 
            v-if="canEdit"
            class="is-link button is-rounded"
            :to="`/posts/${id}/edit`">Edit Post</RouterLink>
            <h1>{{ post?.title }}</h1>
            <div v-html="post?.html" />
        </div>
        <div class="column"></div>
    </div>
</template>