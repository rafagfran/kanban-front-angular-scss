export type TCard = {
	id: string;
	position: number;
	title: string;
};

export type TColumn = {
	id: string;
	position: number;
	title: string;
	cards: TCard[];
};
