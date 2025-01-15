import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WritingService } from '../services/writing.service';
import { Subscription } from 'rxjs';
import { WordCountComponent } from '../word-count/word-count.component';

@Component({
  selector: 'app-writing-area',
  standalone: true,
  imports: [FormsModule, WordCountComponent],
  templateUrl: './writing-area.component.html',
  styleUrl: './writing-area.component.css'
})
export class WritingAreaComponent implements OnInit, OnDestroy {
  @Input() isDarkMode: boolean = false;
  private readonly STORAGE_KEY = 'writing-content';
  private readonly THEME_KEY = 'dark-mode';
  content: string = '';
  private subscription: Subscription;
  showMessage = false;

  constructor(private writingService: WritingService) {
    // Subscribe to content changes from service
    this.subscription = this.writingService.currentContent.subscribe(
      content => this.content = content
      )
  }

  ngOnInit() {
    const savedContent = localStorage.getItem(this.STORAGE_KEY);
    if (savedContent) {
      this.content = savedContent;
      this.writingService.updateContent(savedContent);
    }
        // Load saved theme preference
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        if (savedTheme === 'true') {
          this.isDarkMode = true;
          document.querySelector('.writing-container')?.classList.add('dark');
        }
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    this.subscription.unsubscribe();
  }

  onContentChange() {
    localStorage.setItem(this.STORAGE_KEY, this.content);
    this.writingService.updateContent(this.content);
  }

  getWordCount(): number {
    return this.content.trim() ? this.content.trim().split(/\s+/).length : 0;
  }

  preventClick(event: MouseEvent) {
    const textarea = event.target as HTMLTextAreaElement;
    const clickPosition = textarea.selectionStart;
    const contentLength = textarea.value.length;

    // Only allow click at the end
    if (clickPosition !== contentLength) {
      event.preventDefault();
      this.showPreventClickMessage();
      // textarea.selectionStart = textarea.selectionEnd = contentLength;
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = contentLength;
      }, 0);
    }
  }

  showPreventClickMessage() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 2000);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const textarea = event.target as HTMLTextAreaElement;
    const cursorPosition = textarea.selectionStart;
    
    // If Backspace is pressed
    if (event.key === 'Backspace') {
      const textBeforeCursor = textarea.value.substring(0, cursorPosition);
      const lastNewLineIndex = textBeforeCursor.lastIndexOf('\n');
      
      // If cursor is at start of a paragraph (except first paragraph)
      if (cursorPosition > 0 && 
          cursorPosition === lastNewLineIndex + 1 && 
          lastNewLineIndex !== -1) {
        event.preventDefault();
        this.showPreventClickMessage();
      }
    }
  }
}
