import { Component } from '@angular/core';
import { IconSend } from '../../../../assets/icons/send.component';
import { UiButtonComponent } from '../../../../shared/ui/ui-button/ui-button.component';
import { UiInputComponent } from '../../../../shared/ui/ui-input/ui-input.component';
import { IconAutomate } from '@assets/icons/automate.component';

@Component({
	selector: 'app-chatbot',
	imports: [UiButtonComponent, UiInputComponent, IconSend, IconAutomate],
	templateUrl: './chatbot.component.html',
	styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
	isActiveChatbot = false;

	openChatbot() {
		this.isActiveChatbot = true;
	}

	closeChatbot() {
		this.isActiveChatbot = false;
	}
}
