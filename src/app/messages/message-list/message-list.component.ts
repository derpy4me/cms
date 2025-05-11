import { Component } from '@angular/core';
import { ContactItemComponent } from '../../contacts/contact-list/contact-item/contact-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'cms-message-list',
  imports: [MessageItemComponent, MessageEditComponent, ContactItemComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {}
