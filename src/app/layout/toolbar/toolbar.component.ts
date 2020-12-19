import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input()
  sidenav!: MatSidenav;

  constructor(public layoutService: LayoutService) {}

  ngOnInit(): void {}
}
