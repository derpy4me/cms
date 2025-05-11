import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';

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
  @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage() {
    const messageSubject = this.subjectInputRef.nativeElement.value;
    const messageText = this.messageInputRef.nativeElement.value;
    const newMessage = new Message(
      '1',
      messageSubject,
      messageText,
      this.currentSender
    );

    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }
}
