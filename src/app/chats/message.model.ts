import { Chat } from './chat.model';

export interface Message {
  id: number;
  text: string;
  when: string;
  from: string;
  chat: number | Chat;
}
