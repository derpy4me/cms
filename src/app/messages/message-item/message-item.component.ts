import { Component, Input } from '@angular/core';

import { ContactService } from '../../contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  imports: [],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
})
export class MessageItemComponent {
  @Input() message!: Message;
  messageSender!: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    const contact = this.contactService.getContact(this.message.sender);
    if (!contact) {
      this.messageSender = 'Unknown Sender';
    } else {
      this.messageSender = contact.name;
    }
  }
}
