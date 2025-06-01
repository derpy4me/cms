import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
  imports: [RouterLink],
})
export class ContactDetailComponent {
  contact!: Contact | null;
  id!: string;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = String(+params['id']);
      this.contact = this.contactService.getContact(this.id);
    });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }
}
