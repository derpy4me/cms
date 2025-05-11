import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactItemComponent } from './contact-item/contact-item.component';

@Component({
  selector: 'cms-contact-list',
  imports: [CommonModule, ContactItemComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact(
      '1',
      'R. Kent Jackson',
      'rkjackson@byui.edu',
      '208-496-3771',
      'images/jacksonk.jpg'
    ),
    new Contact(
      '2',
      'Rex Barzee',
      'barzeer@byui.edu',
      '208-496-3768',
      'images/barzeer.jpg'
    ),
  ];

  constructor() {}

  ngOnInit() {}

  onContactSelected(contact: Contact) {
    // console.log(contact);
    this.selectedContactEvent.emit(contact);
  }
}
