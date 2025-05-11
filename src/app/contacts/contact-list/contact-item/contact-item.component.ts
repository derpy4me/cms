import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css',
})
export class ContactItemComponent implements OnInit {
  @Input() contact!: Contact;
  @Output() selectedContactEvent = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onSelected() {
    this.selectedContactEvent.emit();
  }
}
