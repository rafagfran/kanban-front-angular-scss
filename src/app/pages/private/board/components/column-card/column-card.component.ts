import { Component, Input } from '@angular/core';
import { TaskType } from '../../../../../data/MOCK_DATA';

@Component({
	selector: 'column-card',
	imports: [],
	templateUrl: './column-card.component.html',
	styleUrl: './column-card.component.scss',
})
export class ColumnCardComponent {
	@Input() taskData!: TaskType;
}
