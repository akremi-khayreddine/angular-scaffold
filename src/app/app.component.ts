import { Component } from '@angular/core';
import { LayoutService } from './layout/services/layout.service';

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public layoutService: LayoutService) {}
}
