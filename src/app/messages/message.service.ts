import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent = new Subject<Message[]>();
  messages: Message[] = [];
  private firebaseUrl =
    'https://wdd-430-cms-f2e1f-default-rtdb.firebaseio.com/messages.json';
  maxMessageId!: Number;

  constructor(private http: HttpClient) {
    this.http.get<Message[]>(this.firebaseUrl).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getMaxId(): number {
    let maxId = 0;
    if (this.messages && this.messages.length > 0) {
      this.messages.forEach((message) => {
        const id = Number(message.id);
        if (id > maxId) {
          maxId = id;
        }
      });
    }
    return maxId;
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

  deleteMessage(message: Message | null) {
    if (!message) {
      return;
    }
    const pos = this.messages.indexOf(message);
    if (pos < 0) {
      return;
    }
    this.messages.splice(pos, 1);
    this.storeMessages();
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }
    this.messages.push(message);
    this.storeMessages();
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const existingMessagePos = this.messages.indexOf(originalMessage);
    if (existingMessagePos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;

    this.messages[existingMessagePos] = newMessage;

    this.storeMessages();
  }

  storeMessages() {
    const messagesJson = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(this.firebaseUrl, messagesJson, { headers: headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
