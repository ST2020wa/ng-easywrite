import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="countdown" [ngClass]="{'dark': isDarkMode}">
      @if (!isRunning) {
        <input 
          type="number" 
          [(ngModel)]="minutes" 
          (ngModelChange)="validateTime()"
          min="1" 
          max="240"
        > minutes
        <button (click)="start()">Start</button>
      } @else {
        {{ formatTime(timeLeft) }}
        <button (click)="stop()">Stop</button>
      }
      @if (showWarning) {
        <div class="warning">4-hour is great enough for a break :-)</div>
      }
    </div>
  `,
  styles: [`
    .countdown {
      position: fixed;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: #f5f5f5;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      font-size: 1rem;
      line-height: 1.5;
      font-family: Palatino;
      transition: all 0.3s ease;
      cursor: default;
    }

    .dark {
      background-color: #2d2d2d;
      color: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      input {
        background-color:#e9e9e9;
      }
    }

    input {
      width: 60px;
      margin: 0 0.5rem;
      padding: 0.2rem;
      border: none;
    }

    button {
      margin-left: 0.5rem;
      padding: 0.2rem 0.8rem;
      border: none;
      border-radius: 5px;
    }

    .warning {
      color: #ff4444;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
  `]
})
export class CountdownComponent {
  @Input() isDarkMode: boolean = false;
  @Output() stopDialogChange = new EventEmitter<boolean>();
  
  minutes: number = 25;
  timeLeft: number = 0;
  isRunning: boolean = false;
  showWarning: boolean = false;
  showStopDialog: boolean = false;
  private timer: any;

  validateTime() {
    if (this.minutes > 240) {
      this.showWarning = true;
      this.minutes = 240;
    } else {
      this.showWarning = false;
    }
  }

  start() {
    this.isRunning = true;
    this.timeLeft = this.minutes * 60;
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.timer);
    this.showStopDialog = true;
    this.stopDialogChange.emit(true);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
} 