import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();
  documents: Document[];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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

  deleteDocument(document: Document | null) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    const document = this.documents.reduce((prev, current) =>
      prev && prev.id > current.id ? prev : current
    );
    if (document) {
      maxId = Number(document.id);
    }

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!document) {
      return;
    }
    const newId = ++this.maxDocumentId;
    newDocument.id = String(newId);
    this.documents.push(newDocument);
    this.documentChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDoc: Document, newDoc: Document) {
    if (!originalDoc || !newDoc) {
      return;
    }

    const existingDocPos = this.documents.indexOf(originalDoc);
    if (existingDocPos < 0) {
      return;
    }

    newDoc.id = originalDoc.id;

    this.documents[existingDocPos] = newDoc;

    this.documentChangedEvent.next(this.documents.slice());
  }
}
