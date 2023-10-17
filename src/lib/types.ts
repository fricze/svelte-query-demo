export type App = {
	id: number;
	name: string;
};

export type AppDetails = {
	id: number;
	author: string;
	comment?: string;
};

export type FullApp = App & AppDetails;