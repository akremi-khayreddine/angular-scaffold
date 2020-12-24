import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { baseLayers } from 'src/app/core/services/map-options';
import { MapService } from 'src/app/core/services/map.service';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input()
  sidenav!: MatSidenav;

  baseLayers = baseLayers;

  constructor(
    public layoutService: LayoutService,
    public mapService: MapService
  ) {}

  ngOnInit(): void {
  }
}
