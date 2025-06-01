import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ContactListComponent } from './contact-list/contact-list.component';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  imports: [ContactListComponent, CommonModule, RouterOutlet],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent implements OnInit {
  selectedContact!: Contact;
  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      // console.log(contact);
      this.selectedContact = contact;
    });
  }
}
