import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WritingService } from '../services/writing.service';

@Component({
  selector: 'app-writing-area',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './writing-area.component.html',
  styleUrl: './writing-area.component.css'
})
export class WritingAreaComponent implements OnInit {
  private readonly STORAGE_KEY = 'writing-content';
  content: string = '';

  constructor(private writingService: WritingService) {}

  ngOnInit() {
    const savedContent = localStorage.getItem(this.STORAGE_KEY);
    if (savedContent) {
      this.content = savedContent;
      this.writingService.updateContent(savedContent);
    }
  }

  onContentChange() {
    localStorage.setItem(this.STORAGE_KEY, this.content);
    this.writingService.updateContent(this.content);
  }
}
