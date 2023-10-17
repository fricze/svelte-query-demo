<script lang="ts">
	import type { FullApp } from './types';
	import Posts from './AppsView.svelte';
	import { AppsQueries } from './AppsQueries';

	const { appsQuery, appsDetailsQuery, addCommentMutation, addAppMutation } = AppsQueries();

	$: appsList = $appsQuery.data || [];
	$: appsDetails = $appsDetailsQuery.data as FullApp[];
	$: appsDetailsQueryStatus = $appsDetailsQuery.status;
</script>

<div>
	<div>Query status: {$appsQuery.status}</div>
	<div>Query fetching: {$appsQuery.isFetching}</div>
	<Posts
		bind:appsList
		bind:appsDetails
		bind:appsDetailsQueryStatus
		addComment={(id, comment) => $addCommentMutation.mutate({ id, comment })}
		addApp={(name, author) => $addAppMutation.mutate({ name, author })}
	/>
</div>
