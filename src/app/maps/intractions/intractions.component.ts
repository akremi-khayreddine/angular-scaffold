import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OurLayer } from 'src/app/core/services/geoserver.service';
import { CurrentInteraction } from '../maps.component';

@Component({
  selector: 'app-intractions',
  templateUrl: './intractions.component.html',
  styleUrls: ['./intractions.component.scss'],
})
export class IntractionsComponent implements OnInit {
  @Input()
  currentInteraction: CurrentInteraction | null = null;

  @Input() layers: OurLayer[] | null = [];

  @Output()
  onSelect: EventEmitter<any> = new EventEmitter();

  @Output()
  onDelete: EventEmitter<any> = new EventEmitter();

  @Output()
  onDrawPolygon: EventEmitter<OurLayer> = new EventEmitter();

  @Output()
  onDrawPoint: EventEmitter<OurLayer> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
