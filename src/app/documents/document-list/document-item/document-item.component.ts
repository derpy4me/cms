import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Document } from '../../document.model';

@Component({
  selector: 'cms-document-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css',
})
export class DocumentItemComponent {
  @Input() document!: Document;
}
