import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
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

  styles: {
    name: string;
    value: {
      fill: string;
      stroke: string;
    };
  }[] = [
    {
      name: 'red',
      value: {
        fill: 'rgba(229, 29, 29, 0.03)',
        stroke: 'rgb(229, 29, 29)',
      },
    },
    {
      name: 'green',
      value: {
        fill: 'rgba(38, 211, 29, 0.03)',
        stroke: 'rgb(38, 211, 29)',
      },
    },
    {
      name: 'red',
      value: {
        fill: 'rgba(211, 29, 202, 0.03)',
        stroke: 'rgb(211, 29, 202)',
      },
    },
    {
      name: 'red',
      value: {
        fill: 'rgba(143, 16, 178, 0.03)',
        stroke: 'rgb(143, 16, 178)',
      },
    },
    {
      name: 'red',
      value: {
        fill: 'rgba(226, 179, 38, 0.03)',
        stroke: 'rgb(226, 179, 38)',
      },
    },
    {
      name: 'red',
      value: {
        fill: 'rgba(24, 155, 129, 0.03)',
        stroke: 'rgb(24, 155, 129)',
      },
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  setStyle(layer: OurLayer, style: any) {
    layer.layer?.setStyle(
      new Style({
        fill: new Fill({
          color: style.value.fill,
        }),
        stroke: new Stroke({
          color: style.value.stroke,
        }),
      })
    );
  }
}
