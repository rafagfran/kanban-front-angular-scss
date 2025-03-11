import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconAutomate } from '@assets/icons/automate.component';
import { IconSend } from '../../../../assets/icons/send.component';
import { UiButtonComponent } from '../../../../shared/ui/ui-button/ui-button.component';
import { UiInputComponent } from '../../../../shared/ui/ui-input/ui-input.component';
import { IconDotsThree } from "../../../../assets/icons/dots.component";

@Component({
	selector: 'app-chatbot',
	imports: [UiButtonComponent, UiInputComponent, IconSend, IconAutomate, IconDotsThree],
	templateUrl: './chatbot.component.html',
	styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
	isActiveChatbot = false;
  isBotWriting = signal(false)
	chatUserInput = new FormControl('');
	messages = signal([{role: 'bot' , message: 'Hello! How can I help you today?'}]);

	constructor(private http: HttpClient) {}

	openChatbot() {
		this.isActiveChatbot = true;
	}

	closeChatbot() {
		this.isActiveChatbot = false;
	}

	async sendMessage() {
    if(!this.chatUserInput.value ) return;

    this.isBotWriting.set(true)


    this.messages.update((prev) => [...prev, {role: 'user', message: this.chatUserInput.value ?? ''}]);

    try {
      this.http
			.post<{ success: boolean; data: string }>(
				'http://localhost:3000/chatbot',
				{
					message: this.chatUserInput.value,
				},
			)
			.subscribe((data) => {
				this.messages.update((prev) => [...prev, {role: 'bot', message: data.data}]);
        this.chatUserInput.setValue('');
        this.isBotWriting.set(false)
			});
    } catch (error) {
      this.isBotWriting.set(false)
      console.log(error)
    }


	}
}
