import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  @Output() contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  contacts: Contact[];
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    const contact = this.contacts.find((item) => item.id === id);
    if (!contact) {
      return null;
    }
    return contact;
  }

  deleteContact(contact: Contact | null) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    if (this.contacts && this.contacts.length > 0) {
      this.contacts.forEach((contact) => {
        const id = Number(contact.id);
        if (id > maxId) {
          maxId = id;
        }
      });
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    const newId = ++this.maxContactId;
    newContact.id = String(newId);
    this.contacts.push(newContact);
    this.contactChangedEvent.next(this.contacts.slice());
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const existingContactPos = this.contacts.indexOf(originalContact);
    if (existingContactPos < 0) {
      return;
    }

    newContact.id = originalContact.id;

    this.contacts[existingContactPos] = newContact;

    this.contactChangedEvent.next(this.contacts.slice());
  }
}
