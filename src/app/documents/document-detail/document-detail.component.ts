import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-detail',
  imports: [CommonModule],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent implements OnInit {
  @Input() document!: Document;

  ngOnInit() {}
}
