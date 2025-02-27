import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'ui-button',
	imports: [],
	templateUrl: './ui-button.component.html',
	styleUrl: './ui-button.component.scss',
})
export class UiButtonComponent {
	@Input() btnType: 'button' | 'submit' | 'reset' = 'button';
	@Input() variant: 'default' | 'outline' | 'ghost' = 'default';
	@Input() size: 'default' | 'icon' | 'fullWidth' = 'default';
	@Output() onClick = new EventEmitter<Event>();

	handleClick(event: Event) {
		this.onClick.emit(event);
	}
}
