import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { HeaderComponent } from './header/header.component';
import { MessageListComponent } from './messages/message-list/message-list.component';

@Component({
  selector: 'cms-root',
  imports: [
    HeaderComponent,
    ContactsComponent,
    DocumentsComponent,
    MessageListComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cms';
  selectedComponent: String = 'documents';

  switchView(selectedFeature: string) {
    this.selectedComponent = selectedFeature;
  }
}
