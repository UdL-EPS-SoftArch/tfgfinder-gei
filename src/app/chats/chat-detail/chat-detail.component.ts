import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { Message } from '../message.model';
import { NgForOf } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-chat-detail',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {
  chatId!: number;
  messages: Message[] = [];
  newMessageText: string = '';

  constructor(private route: ActivatedRoute, private chatService: ChatService, private authService: AuthenticationBasicService) {}

  ngOnInit(): void {
    this.chatId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMessages();
  }

  loadMessages(): void {
    this.chatService.getMessages(this.chatId).subscribe(data => this.messages = data);
  }

  sendMessage(): void {
    if (!this.newMessageText.trim()) return;

    const currentUser = this.authService.getCurrentUser();

    const newMessage: Partial<Message> = {
      text: this.newMessageText,
      from: currentUser.username,
      chat: this.chatId
    };

    this.chatService.sendMessage(this.chatId, newMessage).subscribe(sent => {
      this.messages.push(sent);
      this.newMessageText = '';
    });
  }

}
