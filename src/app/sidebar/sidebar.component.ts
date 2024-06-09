import { Component } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  toggled = false;
  mobileToggled = false;

  constructor() {}

  toggleSidebar() {
    this.toggled = !this.toggled;
  }

  toggleMobileSidebar() {
    this.mobileToggled = !this.mobileToggled;
  }
}
