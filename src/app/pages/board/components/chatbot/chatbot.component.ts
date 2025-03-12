import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconAutomate } from '@shared/icons/automate.component';
import { IconDotsThree } from '../../../../shared/icons/dots.component';
import { IconSend } from '../../../../shared/icons/send.component';
import { UiButtonComponent } from '../../../../shared/ui/ui-button/ui-button.component';
import { UiInputComponent } from '../../../../shared/ui/ui-input/ui-input.component';
import { BoardService } from '../../board.service';

@Component({
	selector: 'app-chatbot',
	imports: [
		UiButtonComponent,
		UiInputComponent,
		IconSend,
		IconAutomate,
		IconDotsThree,
	],
	templateUrl: './chatbot.component.html',
	styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
	isActiveChatbot = false;
	isBotWriting = signal(false);
	chatUserInput = new FormControl('');
	messages = signal([
		{ role: 'bot', message: 'Hello! How can I help you today?' },
	]);
	@Output() actionTaken = new EventEmitter<boolean>();

	constructor(
		private http: HttpClient,
		private boardService: BoardService,
	) {}

	openChatbot() {
		this.isActiveChatbot = true;
	}

	closeChatbot() {
		this.isActiveChatbot = false;
	}

	async sendMessage() {
		if (!this.chatUserInput.value) return;

		this.isBotWriting.set(true);

		this.messages.update((prev) => [
			...prev,
			{ role: 'user', message: this.chatUserInput.value ?? '' },
		]);

		this.http
			.post<{ toolCalls: boolean; message: string }>(
				'http://localhost:3000/chatbot',
				{
					message: this.chatUserInput.value,
				},
			)
			.subscribe((data) => {
				this.messages.update((prev) => [
					...prev,
					{ role: 'bot', message: data.message },
				]);
				if (data.toolCalls) {
					this.actionTaken.emit();
				}
				this.chatUserInput.setValue('');
				this.isBotWriting.set(false);
			});
	}
}
