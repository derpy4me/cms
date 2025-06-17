import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ContactItemComponent } from '../contact-list/contact-item/contact-item.component';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  imports: [
    ContactItemComponent,
    CommonModule,
    FormsModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
  originalContact!: Contact | null;
  contact!: Contact | null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        this.contact = new Contact('', '', '', '', '', null);
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);

      if (!this.originalContact) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.originalContact.group && this.originalContact.group.length > 0) {
        this.groupContacts = JSON.parse(
          JSON.stringify(this.originalContact.group)
        );
      }
    });
  }

  addToGroup(event: CdkDragDrop<Contact[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const newContact = event.item.data as Contact;

      if (this.contact && this.contact.id === newContact.id) {
        console.warn('Cannot add the contact to its own group.');
        return;
      }

      if (event.container.data.find((c) => c.id === newContact.id)) {
        console.warn('Contact already in the group.');
        return;
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
  onRemoveItem(index: number) {
    if (index >= 0 && index < this.groupContacts.length) {
      this.groupContacts.splice(index, 1);
    }
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    let newContact: Contact;

    if (this.editMode) {
      if (!this.originalContact) {
        console.error(
          'Cannot update: originalContact is missing in edit mode.'
        );
        return;
      }
      newContact = new Contact(
        this.originalContact.id,
        value.name,
        value.email,
        value.phone,
        value.imageUrl,
        this.groupContacts
      );
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      newContact = new Contact(
        '',
        value.name,
        value.email,
        value.phone,
        value.imageUrl,
        this.groupContacts
      );
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }
}
