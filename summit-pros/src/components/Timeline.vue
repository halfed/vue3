<script setup lang="ts">
import TimelineItem from "./TimelineItem.vue";
import { usePosts } from "../stores/posts"
import { periods } from "../constants";

const postsStore = usePosts();


await postsStore.fetchPosts();
</script>

<template>

	<nav class="is-primary panel">
		<span class="panel-tabs timeline">
			<a 
				v-for="period of periods"
				:key="period"
				:class="{'is-active': period === postsStore.selectedPeriod}"
				@click="postsStore.setSelectedPeriod(period)"
			>
				{{ period }}
			</a>
		</span>
		<TimelineItem 
			v-for="post of postsStore.filteredPosts" 
			:key="post.id"
			:post="post"
		/>
	</nav>
</template>

<style lang="scss">
	.timeline {
		background-color: #FFFFFF;
	}
</style>