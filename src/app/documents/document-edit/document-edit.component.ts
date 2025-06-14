import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  originalDocument!: Document | null;
  document!: Document;
  editMode: boolean = false;
  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }

      this.originalDocument = this.documentService.getDocument(id);

      if (!this.originalDocument) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    let newDocument: Document;

    if (this.editMode) {
      if (!this.originalDocument) {
        console.error(
          'Cannot update: originalDocument is missing in edit mode.'
        );
        return;
      }
      newDocument = new Document(
        this.originalDocument.id,
        value.name,
        value.description,
        value.url,
        this.originalDocument.children
      );
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      newDocument = new Document('', value.name, value.description, value.url);
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }
  onCancel() {
    this.router.navigate(['/documents']);
  }
}
