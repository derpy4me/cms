import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownDirective } from '../shared/dropdown.directive';

@Component({
  selector: 'cms-header',
  imports: [DropdownDirective, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor() {}
}
