import { Component, OnInit } from '@angular/core';
import { Chat } from '../chat.model';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chats: Chat[] = [];

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
    this.chatService.getAllChats().subscribe(data => this.chats = data);
  }

  openChat(chatId: number) {
    this.router.navigate(['/chats', chatId]);
  }
}
