import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	Input,
	ViewChild,
	signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColumnType, MOCK_DATA, TaskType } from '../../../../../data/MOCK_DATA';
import { UiButtonComponent } from '../../../../../shared/ui/ui-button/ui-button.component';
import { UiInputComponent } from '../../../../../shared/ui/ui-input/ui-input.component';
import { IconDotsThree } from '../../../../../svg/icons/dots.component';
import { IconPlus } from '../../../../../svg/icons/plus.component';
import { ColumnCardComponent } from '../column-card/column-card.component';

@Component({
	selector: 'board-column',
	imports: [
		UiButtonComponent,
		IconDotsThree,
		CdkDrag,
		CdkDragPlaceholder,
		UiInputComponent,
		IconPlus,
		UiInputComponent,
		ColumnCardComponent,
	],
	templateUrl: './board-column.component.html',
	styleUrl: './board-column.component.scss',
})
export class BoardColumnComponent {
	@ViewChild(UiInputComponent) inputNewTask!: UiInputComponent;
	@ViewChild('newTaskContainer') newTaskContainer!: ElementRef<HTMLDivElement>;
	@Input() columnData!: ColumnType;
	showInput = signal(false);
	newTaskTitle = new FormControl('');

	constructor(private cdRef: ChangeDetectorRef) {}

	disableInput = () => {
		this.showInput.set(false);
		this.newTaskTitle.setValue('');
	};

	enableInput = () => {
		this.showInput.set(true);
	};

	addNewTaskToColumn = ({ columnId }: { columnId: string }) => {
		if (this.newTaskTitle.value) {
			const newTask: TaskType = {
				id: Date.now().toString(),
				title: this.newTaskTitle.value,
				description: '',
			};
			MOCK_DATA.find((column) => column.id === columnId)?.tasks.push(newTask);
			this.newTaskTitle.setValue('');
			this.showInput.set(false);
		} else {
			this.inputNewTask.setFocus();
		}
	};

	@HostListener('document:click', ['$event'])
	onClickOutside(event: Event) {
		if (
			this.showInput() &&
			this.inputNewTask &&
			!this.newTaskContainer.nativeElement.contains(event.target as Node)
		) {
			this.showInput.set(false);
			this.newTaskTitle.setValue('');
		}
	}
}
