import { Routes } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent },
  { path: 'messages', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent },
];
