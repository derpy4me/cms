import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItemComponent } from './document-item/document-item.component';
@Component({
  selector: 'cms-document-list',
  imports: [DocumentItemComponent, CommonModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(
      '1',
      'My Test Doc 1',
      'This is a test document',
      'https://www.google.com/url?sa=E&source=gmail&q=http://example.com/doc1'
    ),
    new Document(
      '2',
      'Another Sample Document',
      "Just another sample. Don't worry about it.",
      'http://example.com/doc2'
    ),
    new Document(
      'grinch001',
      "The Grinch's Guide to Holiday Cheer (Surprisingly Effective!)",
      'A step-by-step manual, post-heart-growth, on how to spread joy, not gloom, in Whoville and beyond. Includes cookie recipes.',
      'https://whoville.net/grinch/holiday-guide'
    ),
    new Document(
      'hortonHearsAWho2025',
      "Horton's Handbook for Hearing the Smallest Specks",
      "An elephant's ear-witness account and guide to amplifying tiny voices.",
      'https://jungleofnool.org/horton/listening-tips'
    ),
    new Document(
      'catInTheHatChaosPlan',
      "The Cat in the Hat's Rainy Day Activity Blueprint",
      'Official plans for turning any dull day into an adventure. Warning: May involve balancing fishbowls',
      'https://funinabox.com/catinthehat/rainy-day-mayhem'
    ),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
