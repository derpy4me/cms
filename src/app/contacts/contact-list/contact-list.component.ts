import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ContactItemComponent } from './contact-item/contact-item.component';

@Component({
  selector: 'cms-contact-list',
  imports: [CommonModule, ContactItemComponent, RouterLink],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }
}
