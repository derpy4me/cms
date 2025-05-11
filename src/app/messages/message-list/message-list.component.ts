import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { MessageItemComponent } from '../message-item/message-item.component';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  imports: [MessageItemComponent, MessageEditComponent, CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('2', 'Test', 'This is a simple test. Ignore', 'Some Rando'),
    new Message('3', 'Cat in', 'I can show you a thing', 'Thing One'),
    new Message('4', 'A Hat', 'Or two', 'Thing Two'),
    new Message('5', 'Hey;)', 'What you doing for dinner?', 'Some Rando'),
  ];

  onAddMesssage(message: Message) {
    this.messages.push(message);
  }
}
