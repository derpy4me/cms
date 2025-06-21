import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ContactsFilterPipe } from '../contacts-filter.pipe';
import { ContactItemComponent } from './contact-item/contact-item.component';

@Component({
  selector: 'cms-contact-list',
  imports: [
    CommonModule,
    ContactItemComponent,
    RouterLink,
    CdkDropList,
    CdkDrag,
    ContactsFilterPipe,
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  private subscription!: Subscription;
  term!: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
