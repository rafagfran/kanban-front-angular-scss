import { Component } from '@angular/core';
import { UiButtonComponent } from '../../../../../shared/ui/ui-button/ui-button.component';

@Component({
	selector: 'board-header',
	imports: [UiButtonComponent],
	templateUrl: './board-header.component.html',
	styleUrl: './board-header.component.scss',
})
export class BoardHeaderComponent {
	currentDate = new Date().toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}
