import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-word-count',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="word-count" [ngClass]="{'dark': isDarkMode}">
      {{ wordCount }} words
    </div>
  `,
  styles: [`
    .word-count {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: #f5f5f5;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      font-size: 0.9rem;
      font-family: Palatino;
      transition: all 0.3s ease;
      cursor: pointer;
      &.dark{
    background-color: #2d2d2d;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
    }

    .dark {
      background-color: #2d2d2d;
      color: #ffffff;
    }
  `]
})
export class WordCountComponent {
  @Input() wordCount: number = 0;
  @Input() isDarkMode: boolean = false;
} 