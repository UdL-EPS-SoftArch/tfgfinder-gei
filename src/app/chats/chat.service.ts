import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from './chat.model';
import { Message } from './message.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = `${environment.API}chats`;

  constructor(private http: HttpClient) {}

  getAllChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.apiUrl);
  }

  getMessages(chatId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${chatId}/messages`);
  }

  sendMessage(chatId: number, message: Partial<Message>): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/${chatId}/messages`, message);
  }
  createChat(username: string): Observable<Chat> {
    return this.http.post<Chat>(`${this.apiUrl}`, { username });
  }
}
