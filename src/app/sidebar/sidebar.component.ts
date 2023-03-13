import { Component } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  toggled = false;

  constructor() { }

  toggleSidebar() {
    this.toggled = !this.toggled;
    console.log(this.toggled)
  }
}
