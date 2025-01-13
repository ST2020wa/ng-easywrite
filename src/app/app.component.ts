import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WritingAreaComponent } from './writing-area/writing-area.component';
import { PanelComponent } from './panel/panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WritingAreaComponent, PanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-easywrite';
}
