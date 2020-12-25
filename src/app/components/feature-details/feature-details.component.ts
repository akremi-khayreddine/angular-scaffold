import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feature } from 'ol';
import { OurLayer } from 'src/app/core/models/OurLayer';

@Component({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.scss'],
})
export class FeatureDetailsComponent implements OnInit {
  @Input()
  layer: OurLayer | null = null;

  @Input()
  feature: Feature | null = null;

  @Output()
  close: EventEmitter<any> = new EventEmitter();

  get attributes() {
    return this.layer?.value.attributes.attribute
      .filter((attribute: any) => attribute.name !== 'the_geom')
      .map((attribute: any) => {
        return {
          name: attribute.name,
          value: this.feature?.getProperties()[attribute.name],
        };
      });
  }

  constructor() {}

  ngOnInit(): void {}
}
