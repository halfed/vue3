<script setup lang="ts">
import TimelineItem from "./TimelineItem.vue";
import { usePosts } from "../stores/posts"
import { periods } from "../constants";

const postsStore = usePosts()

// const periods = ["Today", "This Week", "This Month"] as const;

// type Period = typeof periods[number];

// const selectedPeriod = ref<Period>("Today");

// function selectPeriod(period: Period) {
// 	console.log(period);
// 	selectedPeriod.value = period;
// }

// const posts = computed<TimelinePost[]>(() => {
// 	return postsStore.ids
// 		.map(id => {
// 			const post = postsStore.all.get(id)

// 			if (!post) {
// 				throw Error(`Post with id of ${id} was expected but not found`)
// 			}
// 		return {
// 			...post,
// 			created: DateTime.fromISO(post.created)
// 		}
// 	})
// 		.filter(post => {
// 			if (postsStore.selectedPeriod === "Today") {
// 				return post.created >= DateTime.now().minus({ day: 1 });
// 			}

// 			if (postsStore.selectedPeriod === "This Week") {
// 				return post.created >= DateTime.now().minus({ week: 1 });
// 			}

// 			return post;
// 		});
// });
	await postsStore.fetchPosts()
</script>

<template>

	<nav class="is-primary panel">
		<span class="panel-tabs">
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