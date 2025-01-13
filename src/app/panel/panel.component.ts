import { Component } from '@angular/core';
import { WritingService } from '../services/writing.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  icons = [
    {name:'full',icon:'🔲', msg: 'Full Screen'},
    {name: 'dark', icon: '🌓', msg: 'Switch Dark Theme'},
    {name: 'export', icon: '💾', msg:'Save As'},
    {name: 'timer', icon: '⏳', msg: 'Set Timer'},
    {name:'delete',icon:'🗑️', msg: 'Delete All'}
  ];

  isFullScreen = false;

  constructor(private writingService: WritingService) {}

  onIconClick(iconName: string) {
    switch (iconName) {
      case 'full':
        this.toggleFullScreen();
        break;
      case 'dark':
        break;
        case 'export':
            this.exportToTxt();
            break;
      case 'timer':
        break;
        case 'delete':
            if (confirm('Are you sure you want to delete all content?')) {
              this.deleteAllInput();
            }
            break;
      default:
        console.log(`Unhandled icon click: ${iconName}`);
    }
  }

  private exportToTxt() {
    this.writingService.currentContent.subscribe(content => {
      // Create a Blob with the content
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      
      // Create a temporary link element
      const element = document.createElement('a');
      element.href = URL.createObjectURL(blob);
      
      // Set the filename with current date
      const date = new Date();
      const filename = `writing_${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}.txt`;
      
      element.download = filename;

      // Append to body, click and remove
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      // Clean up the URL object
      URL.revokeObjectURL(element.href);
    }).unsubscribe();  // Unsubscribe after first emission
  }

  private async toggleFullScreen() {
    if (!this.isFullScreen) {
      try {
        await document.documentElement.requestFullscreen();
        this.isFullScreen = true;
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        this.isFullScreen = false;
      } catch (err) {
        console.error('Error attempting to exit fullscreen:', err);
      }
    }
  }

  private deleteAllInput() {
    this.writingService.clearContent();
  }
} 