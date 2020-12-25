import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OurLayer } from 'src/app/core/services/geoserver.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
})
export class LegendComponent implements OnInit {
  @Input() layers: OurLayer[] | null = [];

  @Output()
  toggle: EventEmitter<{
    layer: OurLayer;
    checked: boolean;
  }> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
