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
import { IconPlus } from '@shared/icons/plus.component';
import { UiButtonComponent } from '@shared/ui/ui-button/ui-button.component';
import { UiInputComponent } from '@shared/ui/ui-input/ui-input.component';
import { Cards, Columns } from '@type/types';
import { BoardService } from './board.service';
import { BoardColumnComponent } from './components/board-column/board-column.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

@Component({
	selector: 'app-board',
	imports: [
		BoardHeaderComponent,
		CdkDrag,
		CdkDropList,
		CdkDropListGroup,
		BoardColumnComponent,
		UiInputComponent,
		UiButtonComponent,
		IconPlus,
		ChatbotComponent,
	],
	templateUrl: './board.component.html',
	styleUrl: './board.component.scss',
})
export class BoardComponent {
	@ViewChild(UiInputComponent) inputNewList!: UiInputComponent;
	@ViewChild('newListContainer') newListContainer!: ElementRef<HTMLDivElement>;

	columns = signal<Columns[]>([]);
	showInput = signal(false);
	newColumnTitle = new FormControl('');

	constructor(private boardService: BoardService) {}

	getBoardData() {
		this.boardService.fetchColumnsWithCards().subscribe({
			next: (data) => {
				this.columns.set(data);
			},
			error: (error) => console.log(error),
			complete: () => console.log('Get Cols Success'),
		});
	}

	ngOnInit() {
		this.getBoardData();
	}

	enableInput = () => {
		this.showInput.set(true);
	};

	addNewList() {
		// if (this.newColumnTitle.value) {
		// 	this.http
		// 		.post<Columns>('http://localhost:3000/column', {
		// 			title: this.newColumnTitle.value,
		// 		})
		// 		.subscribe((newColumn) => {
		// 			console.log(newColumn);
		// 			this.columns = [...this.columns, newColumn];
		// 			this.newColumnTitle.setValue('');
		// 			this.showInput.set(false);
		// 		});
		// }
	}

	dropColumn(event: CdkDragDrop<Columns[]>) {
		moveItemInArray(this.columns(), event.previousIndex, event.currentIndex);
	}

	dropCard(event: CdkDragDrop<Cards[]>) {
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
			this.newColumnTitle.setValue('');
		}
	}
}
