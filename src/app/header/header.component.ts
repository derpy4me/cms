import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() componentFeatureSelected = new EventEmitter<string>();

  onSelected(selectedEvent: string) {
    this.componentFeatureSelected.emit(selectedEvent);
  }
}
