export type Cards = {
	id: string;
	position: number;
	title: string;
};

export type Columns = {
	id: string;
	position: number;
	title: string;
	cards: Cards[];
};
