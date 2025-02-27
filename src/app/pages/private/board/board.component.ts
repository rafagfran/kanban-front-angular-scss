import {
	CdkDrag,
	CdkDragDrop,
	CdkDragPlaceholder,
	CdkDropList,
	CdkDropListGroup,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
	Component,
	ElementRef,
	HostListener,
	ViewChild,
	signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MOCK_DATA, TaskType } from '../../../data/MOCK_DATA';
import { UiButtonComponent } from '../../../shared/ui/ui-button/ui-button.component';
import { UiInputComponent } from '../../../shared/ui/ui-input/ui-input.component';
import { IconPlus } from '../../../svg/icons/plus.component';
import { ColumnType } from '../../../types/types';
import { BoardColumnComponent } from './components/board-column/board-column.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';

@Component({
	selector: 'app-board',
	imports: [
		BoardHeaderComponent,
		CdkDrag,
		CdkDragPlaceholder,
		CdkDropList,
		CdkDropListGroup,
		BoardColumnComponent,
		UiInputComponent,
		UiButtonComponent,
		IconPlus,
	],
	templateUrl: './board.component.html',
	styleUrl: './board.component.scss',
})
export class BoardComponent {
	@ViewChild(UiInputComponent) inputNewList!: UiInputComponent;
	@ViewChild('newListContainer') newListContainer!: ElementRef<HTMLDivElement>;
	columns: ColumnType[] = MOCK_DATA;
	showInput = signal(false);
	newListTitle = new FormControl('');

	enableInput = () => {
		this.showInput.set(true);
	};

	addNewList() {
		if (this.newListTitle.value) {
			this.columns.push({
				id: Date.now().toString(),
				title: this.newListTitle.value,
				tasks: [],
			});
			this.showInput.set(false);
			this.newListTitle.setValue('');
		}
	}

	dropColumn(event: CdkDragDrop<ColumnType[]>) {
		moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
	}

	dropCard(event: CdkDragDrop<TaskType[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
		}
	}
	@HostListener('document:click', ['$event'])
	onClickOutside(event: Event) {
		if (
			this.showInput() &&
			this.inputNewList &&
			!this.newListContainer.nativeElement.contains(event.target as Node)
		) {
			this.showInput.set(false);
			this.newListTitle.setValue('');
		}
	}
}
