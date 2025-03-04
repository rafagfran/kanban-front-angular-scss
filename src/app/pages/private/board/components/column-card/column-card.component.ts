import { Component, Input } from '@angular/core';
import { TCard } from '@type/types';

@Component({
	selector: 'column-card',
	imports: [],
	templateUrl: './column-card.component.html',
	styleUrl: './column-card.component.scss',
})
export class ColumnCardComponent {
	@Input() cardData!: TCard;
}
