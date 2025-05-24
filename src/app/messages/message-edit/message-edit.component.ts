import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  imports: [],
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  currentSender = 'Bill Murray';
  @ViewChild('subject', { static: false }) subjectInputRef!: ElementRef;
  @ViewChild('message', { static: false }) messageInputRef!: ElementRef;

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    const messageSubject = this.subjectInputRef.nativeElement.value;
    const messageText = this.messageInputRef.nativeElement.value;
    const newMessage = new Message(
      '1',
      messageSubject,
      messageText,
      this.currentSender
    );

    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }
}
