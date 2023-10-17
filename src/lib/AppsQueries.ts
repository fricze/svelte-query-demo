import { createMutation, createQuery, useQueryClient } from "@tanstack/svelte-query";
import { addApp, addComment, getApps, getAppsDetails } from "./services";
import type { App } from "./types";
import { derived } from "svelte/store";

export const AppsQueries = () => {
    const queryClient = useQueryClient();

    const appsQuery = createQuery<App[], Error>({
		queryKey: ['apps'],
		queryFn: () => getApps(),
		initialData: [],
	});

    // Derived queries created based on example from docs: https://tanstack.com/query/latest/docs/svelte/reactivity
	// Derived queries should be created when queryFn needs arguments from other query.
	// If queryFn does not need data from other query it's best to avoid creating derived queries,
	// for sake of simplicity. Always start with simple queries and queries invalidation.
	// Remember that both query keys and derived queries create your graph of queries dependencies.
	//
	// Also, if one query needs data from two, or more, services that depend on each other
	// it might be prefferable to call this services together, in one queryFn.
	// Decision about creating derived queries should depend on actual elasticity and granularity
	// you need in working with particular services
    const appsDetailsQuery = createQuery(
		derived(appsQuery, ($apps) => ({
			queryKey: ['app-details'],
			queryFn: () => getAppsDetails($apps.data || []),
			enabled: $apps.isSuccess && !$apps.isFetching,
			initialData: [],
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

    return { appsQuery, appsDetailsQuery, addCommentMutation, addAppMutation }
}