import {
	CdkDrag,
	CdkDragDrop,
	CdkDropList,
	CdkDropListGroup,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import {
	Component,
	ElementRef,
	HostListener,
	ViewChild,
	signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UiButtonComponent } from '@shared/ui/ui-button/ui-button.component';
import { UiInputComponent } from '@shared/ui/ui-input/ui-input.component';
import { TCard, TColumn } from '@type/types';
import { IconPlus } from '@assets/icons/plus.component';
import { BoardColumnComponent } from './components/board-column/board-column.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { ChatbotComponent } from "./components/chatbot/chatbot.component";

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
    ChatbotComponent
],
	templateUrl: './board.component.html',
	styleUrl: './board.component.scss',
})
export class BoardComponent {
	@ViewChild(UiInputComponent) inputNewList!: UiInputComponent;
	@ViewChild('newListContainer') newListContainer!: ElementRef<HTMLDivElement>;
	columns: TColumn[] = [];
	showInput = signal(false);
	newColumnTitle = new FormControl('');

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.http
			.get<TColumn[]>('http://localhost:3000/column/with-cards')
			.subscribe((data) => {
				this.columns = data;
			});
	}

	enableInput = () => {
		this.showInput.set(true);
	};

	addNewList() {
		if (this.newColumnTitle.value) {
			this.http
				.post<TColumn>('http://localhost:3000/column', {
					title: this.newColumnTitle.value,
				})
				.subscribe((newColumn) => {
					console.log(newColumn);
					this.columns = [...this.columns, newColumn];
					this.newColumnTitle.setValue('');
					this.showInput.set(false);
				});
		}
	}

	dropColumn(event: CdkDragDrop<TColumn[]>) {
		moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
	}

	dropCard(event: CdkDragDrop<TCard[]>) {
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
