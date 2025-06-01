import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  imports: [
    DocumentListComponent,
    DocumentDetailComponent,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent implements OnInit {
  selectedDocument!: Document;
  constructor(private documentService: DocumentService) {}
  ngOnInit() {
    this.documentService.selectedDocumentEvent.subscribe(
      (document: Document) => {
        // console.log(document)
        this.selectedDocument = document;
      }
    );
  }

  onSelectedDocument(document: Document) {
    this.selectedDocument = document;
  }
}
