import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-writing-area',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './writing-area.component.html',
  styleUrl: './writing-area.component.css'
})
export class WritingAreaComponent {
  content: string = '';
}
