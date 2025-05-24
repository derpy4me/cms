import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  @Output() messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[];

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    const message = this.messages.find((item) => item.id === id);
    if (!message) {
      return null;
    }
    return message;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.getMessages());
  }
}
