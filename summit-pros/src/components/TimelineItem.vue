<script setup lang="ts">
import { RouterLink } from "vue-router";
import { TimelinePost } from "../posts";


defineProps<{
	post: TimelinePost
}>()

</script>

<template>
<RouterLink
    :to="`/posts/${post.id}`"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start timeline-posts">
    <a>{{ post.title }}</a>
    <div>{{ post.created.toFormat("d  MMM") }}</div>
</RouterLink>
</template>

<style lang="scss" scoped>
	.timeline-posts {
		background-color: #FFFFFF;
	}
</style>