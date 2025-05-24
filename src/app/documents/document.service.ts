import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    const document = this.documents.find((item) => item.id === id);
    if (!document) {
      return null;
    }
    return document;
  }
}
