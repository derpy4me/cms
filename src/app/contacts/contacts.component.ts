import { Component, OnInit } from '@angular/core';
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { ContactListComponent } from "./contact-list/contact-list.component";

@Component({
  selector: 'cms-contacts',
  imports: [ContactDetailComponent, ContactListComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit{
  constructor() { }

  ngOnInit() {
  }

}
