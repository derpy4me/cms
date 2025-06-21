import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  selectedDocumentEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId!: number;
  private firebaseUrl =
    'https://wdd-430-cms-f2e1f-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) {
    this.http.get<Document[]>(this.firebaseUrl).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.documentChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );
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
    this.storeDocuments();
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
    if (!newDocument) {
      return;
    }
    const newId = ++this.maxDocumentId;
    newDocument.id = String(newId);
    this.documents.push(newDocument);
    this.storeDocuments();
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

    this.storeDocuments();
  }

  storeDocuments() {
    const documentsJson = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(this.firebaseUrl, documentsJson, {
        headers: headers,
      })
      .subscribe(() => {
        this.documentChangedEvent.next(this.documents.slice());
      });
  }
}
