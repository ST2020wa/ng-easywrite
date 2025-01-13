import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WritingService {
  private contentSource = new BehaviorSubject<string>('');
  currentContent = this.contentSource.asObservable();

  updateContent(content: string) {
    this.contentSource.next(content);
  }

  clearContent() {
    this.contentSource.next('');
    localStorage.removeItem('writing-content');
  }
} 