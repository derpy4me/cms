import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Contact } from '../../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css',
  imports: [RouterLink, RouterLinkActive],
})
export class ContactItemComponent implements OnInit {
  @Input() contact!: Contact;
  @Output() selectedContactEvent = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
