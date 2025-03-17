enum CardPriority {
	Low = 'low',
	Medium = 'medium',
	Hight = 'high',
}

export type Cards = {
	id: string;
	position: number;
	title: string;
	priority: CardPriority;
};

export type Columns = {
	id: string;
	position: number;
	title: string;
	cards: Cards[];
};
