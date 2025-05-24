import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { DocumentItemComponent } from './document-item/document-item.component';

@Component({
  selector: 'cms-document-list',
  imports: [DocumentItemComponent, CommonModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {
  documents: Document[] = [];
  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  onDocumentSelected(document: Document) {
    this.documentService.selectedDocumentEvent.emit(document);
  }
}
