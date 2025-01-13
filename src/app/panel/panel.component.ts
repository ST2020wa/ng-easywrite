import { Component } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  icons = [
    { name: 'home', icon: '🏠' },
    { name: 'search', icon: '🔍' },
    { name: 'add', icon: '➕' },
    { name: 'favorite', icon: '❤️' },
    { name: 'settings', icon: '⚙️' }
  ];

  onIconClick(iconName: string) {
    console.log(`Clicked ${iconName}`);
    // Add your click handling logic here
  }
} 