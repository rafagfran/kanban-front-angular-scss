import { CdkDrag } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import {
	Component,
	ElementRef,
	HostListener,
	Input,
	ViewChild,
	signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconPlus } from '@shared/icons/plus.component';
import { UiButtonComponent } from '@shared/ui/ui-button/ui-button.component';
import { UiDropdownComponent } from '@shared/ui/ui-dropdown/ui-dropdown.component';
import { UiInputComponent } from '@shared/ui/ui-input/ui-input.component';
import { Cards, Columns } from '@type/types';
import { ColumnCardComponent } from '../column-card/column-card.component';

@Component({
	selector: 'board-column',
	imports: [
		UiButtonComponent,
		CdkDrag,
		UiInputComponent,
		IconPlus,
		UiInputComponent,
		ColumnCardComponent,
		UiDropdownComponent,
	],
	templateUrl: './board-column.component.html',
	styleUrl: './board-column.component.scss',
})
export class BoardColumnComponent {
	@ViewChild(UiInputComponent) inputNewTask!: UiInputComponent;
	@ViewChild('newTaskContainer') newTaskContainer!: ElementRef<HTMLDivElement>;
	@Input() columnData!: Columns;
	showInput = signal(false);
	newCardTitle = new FormControl('');

	constructor(private http: HttpClient) {}
	// constructor(private cdRef: ChangeDetectorRef) {}

	disableInput = () => {
		this.showInput.set(false);
		this.newCardTitle.setValue('');
	};

	enableInput = () => {
		this.showInput.set(true);
	};

	addNewTaskToColumn = ({ columnId }: { columnId: string }) => {
		this.http
			.post<Cards>('http://localhost:3000/card', {
				title: this.newCardTitle.value,
				columnId,
			})
			.subscribe((data) => {
				this.columnData.cards.push(data);
				this.newCardTitle.setValue('');
				this.showInput.set(false);
			});

		// if (this.newTaskTitle.value) {
		// 	const newTask: Cards = {
		// 		id: Date.now().toString(),
		// 		title: this.newTaskTitle.value,
		// 		description: '',
		// 	};
		// 	MOCK_DATA.find((column) => column.id === columnId)?.tasks.push(newTask);
		// 	this.newTaskTitle.setValue('');
		// 	this.showInput.set(false);
		// } else {
		// 	this.inputNewTask.setFocus();
		// }
	};

	@HostListener('document:click', ['$event'])
	onClickOutside(event: Event) {
		if (
			this.showInput() &&
			this.inputNewTask &&
			!this.newTaskContainer.nativeElement.contains(event.target as Node)
		) {
			this.showInput.set(false);
			this.newCardTitle.setValue('');
		}
	}
}
