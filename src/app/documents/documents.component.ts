import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { Document } from './document.model';

@Component({
  selector: 'cms-documents',
  imports: [DocumentListComponent, DocumentDetailComponent, CommonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent implements OnInit {
  selectedDocument!: Document;
  ngOnInit() {}

  onSelectedDocument(document: Document) {
    this.selectedDocument = document;
  }
}
