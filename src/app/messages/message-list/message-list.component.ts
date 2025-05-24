import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { MessageItemComponent } from '../message-item/message-item.component';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  imports: [MessageItemComponent, MessageEditComponent, CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }
}
