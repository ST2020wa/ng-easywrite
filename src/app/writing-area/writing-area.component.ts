import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WritingService } from '../services/writing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-writing-area',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './writing-area.component.html',
  styleUrl: './writing-area.component.css'
})
export class WritingAreaComponent implements OnInit, OnDestroy {
  private readonly STORAGE_KEY = 'writing-content';
  content: string = '';
  private subscription: Subscription;

  constructor(private writingService: WritingService) {
    // Subscribe to content changes from service
    this.subscription = this.writingService.currentContent.subscribe(
      content => this.content = content
    );
  }

  ngOnInit() {
    const savedContent = localStorage.getItem(this.STORAGE_KEY);
    if (savedContent) {
      this.content = savedContent;
      this.writingService.updateContent(savedContent);
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
}
