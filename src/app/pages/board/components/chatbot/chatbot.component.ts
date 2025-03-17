import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconAutomate } from '@shared/icons/automate.component';
import DOMPurify from 'dompurify';
import { IconClose } from '../../../../shared/icons/close';
import { IconSend } from '../../../../shared/icons/send.component';
import { UiButtonComponent } from '../../../../shared/ui/ui-button/ui-button.component';
import { UiInputComponent } from '../../../../shared/ui/ui-input/ui-input.component';
import { TimeFormatPipe } from '../../../../time-format.pipe';
import { BoardService } from '../../board.service';
@Component({
	selector: 'app-chatbot',
	imports: [
		UiButtonComponent,
		UiInputComponent,
		IconSend,
		IconAutomate,
		TimeFormatPipe,
		IconClose,
	],
	templateUrl: './chatbot.component.html',
	styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
	isActiveChatbot = false;
	isBotWriting = signal(false);
	chatUserInput = new FormControl('');
	messages = signal<
		{ role: string; content: string; timestamp: Date | number }[]
	>([
		{
			role: 'bot',
			content: 'Olá, como posso te ajudar hoje?',
			timestamp: Date.now(),
		},
	]);
	typingMessage = 'Processando ...';

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
			{
				role: 'user',
				content: this.chatUserInput.value ?? '',
				timestamp: Date.now(),
			},
		]);

		this.http
			.post<{ toolCalls: boolean; message: string; timestamp: Date }>(
				'http://localhost:3000/chatbot',
				{
					message: this.chatUserInput.value,
				},
			)
			.subscribe((data) => {
				// Messages arrive in HTML format
				// const htmlContent = marked(data.message) as string;
				const safeResponse = DOMPurify.sanitize(data.message);

				this.messages.update((prev) => [
					...prev,
					{ role: 'bot', content: safeResponse, timestamp: Date.now() },
				]);
				if (data.toolCalls) {
					this.actionTaken.emit();
				}

				this.isBotWriting.set(false);
			});

		this.chatUserInput.setValue('');
	}
}
