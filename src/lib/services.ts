import type { App, AppDetails, FullApp } from './types';

let timeout = () =>
	new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(true);
		}, 500);
	});

export const getApps = async (): Promise<App[]> => {
	const response = await fetch('http://localhost:8000/apps');
	return await response.json();
};

export const getAppsDetails = async (apps: App[]): Promise<FullApp[]> => {
	const response = await fetch('http://localhost:8000/appsDetails');
	let data = (await response.json()) as AppDetails[];
	data = data.map((el, idx) => ({
		...el,
		name: (apps && apps[idx].name) ?? ''
	}));

	return data as FullApp[];
};

export const addComment = async (id: number, comment: string): Promise<string> => {
	const response = await fetch(`http://localhost:8000/appsDetails/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id,
			comment
		})
	});

	return response.text();
};

export const addApp = async (name: string, author: string): Promise<string> => {
	const responseApp = await fetch(`http://localhost:8000/apps`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name
		})
	});

	const responseDetails = await fetch(`http://localhost:8000/appsDetails`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			author
		})
	});

	return (await Promise.all([responseApp, responseDetails])).join(', ');
};
