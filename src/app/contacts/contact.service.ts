import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId!: number;
  private firebaseUrl =
    'https://wdd-430-cms-f2e1f-default-rtdb.firebaseio.com/contacts.json';

  constructor(private http: HttpClient) {
    this.http.get<Contact[]>(this.firebaseUrl).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.contactChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );
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
    this.storeContacts();
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
    this.storeContacts();
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

    this.storeContacts();
  }

  storeContacts() {
    const documentsJson = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(this.firebaseUrl, documentsJson, { headers: headers })
      .subscribe(() => {
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }
}
