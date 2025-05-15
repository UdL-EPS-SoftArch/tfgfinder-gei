import { Chat } from './chat.model';

export interface Message {
  id: number;
  text: string;
  when: string;
  from: number;
  chat: number | Chat;
}
