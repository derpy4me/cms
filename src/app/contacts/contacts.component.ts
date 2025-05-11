import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  imports: [ContactDetailComponent, ContactListComponent, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent implements OnInit {
  selectedContact!: Contact;
  constructor() {}

  ngOnInit() {}

  onSelectedContact(contact: Contact) {
    console.log(contact);
    this.selectedContact = contact;
  }
}
