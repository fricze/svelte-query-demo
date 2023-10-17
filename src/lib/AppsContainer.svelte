<script lang="ts">
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { getAppsDetails, getApps, addApp, addComment } from './services';
	import type { App, FullApp } from './types';
	import { derived } from 'svelte/store';
	import Posts from './AppsView.svelte';

	const queryClient = useQueryClient();

	const appsQuery = createQuery<App[], Error>({
		queryKey: ['apps'],
		queryFn: () => getApps()
	});

	const appsDetailsQuery = createQuery(
		derived(appsQuery, ($apps) => ({
			queryKey: ['app-details'],
			queryFn: () => getAppsDetails($apps.data || []),
			enabled: $appsQuery.isSuccess && !$appsQuery.isFetching
		}))
	);

	const addCommentMutation = createMutation({
		mutationFn: ({ id, comment }: { id: number; comment: string }) => addComment(id, comment),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['apps'] });
		}
	});

	const addAppMutation = createMutation({
		mutationFn: ({ name, author }: { name: string; author: string }) => addApp(name, author),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['apps'] });
		}
	});

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
