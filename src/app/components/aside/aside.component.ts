import { Component } from '@angular/core';

@Component({
  selector: 'app-aside',
  standalone: false,
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  isMinimized = false;

  toggleSidebar() {
    this.isMinimized = !this.isMinimized;
  }
}
