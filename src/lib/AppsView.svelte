<script lang="ts">
	import AddApp from './AddApp.svelte';
	import Comment from './Comment.svelte';
	import type { App, FullApp } from './types';

	export let appsList: App[];
	export let appsDetailsQueryStatus: string;
	export let appsDetails: FullApp[];

	export let addComment: (id: number, comment: string) => void;
	export let addApp: (name: string, author: string) => void;
</script>

<div class="apps-view">
	<section>
		<AddApp {addApp} />
	</section>
	<section>
		<h1>Apps</h1>
		<ul>
			{#each appsList as app, idx}
				<li>
					<h1>App: {app.name}</h1>

					<Comment {addComment} idx={idx + 1} />
				</li>
			{/each}
		</ul>
	</section>

	<section>
		<h1>Apps with details</h1>
		{#if appsDetailsQueryStatus === 'success'}
			<ul>
				{#each appsDetails as app}
					<article>
						<h1>App: {app.name}</h1>
						<p>Author: {app.author}</p>
						{#if app.comment}
							<p>Comment: {app.comment}</p>
						{/if}
					</article>
				{/each}
			</ul>
		{/if}
	</section>
</div>

<style>
	.apps-view {
		display: flex;
		gap: 40px;
	}
</style>
