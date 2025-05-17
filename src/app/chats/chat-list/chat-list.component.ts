import { Component, OnInit } from '@angular/core';
import { Chat } from '../chat.model';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chats: Chat[] = [];
  newChatUsername: string = '';  // <-- Torna a posar aquesta propietat

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
    this.chatService.getAllChats().subscribe(data => this.chats = data);
  }

  openChat(chatId: number) {
    this.router.navigate(['/chats', chatId]).then(success => {
      if (!success) console.error('Navegació fallida');
    });
  }

  createChat() {
    if (!this.newChatUsername) {
      alert('El nom d\'usuari és obligatori per crear un xat.');
      return;
    }
    this.chatService.createChat(this.newChatUsername).subscribe({
      next: newChat => {
        alert('Nou xat creat: ' + JSON.stringify(newChat));
        this.chats.push(newChat);
        if (newChat.id) {
          this.openChat(newChat.id);
        } else {
          alert('No s\'ha pogut obtenir l\'ID del nou xat.');
        }
      },
      error: err => {
        alert('Error creant xat: ' + JSON.stringify(err));
        console.error('Error API createChat:', err);
      }
    });
  }
}
