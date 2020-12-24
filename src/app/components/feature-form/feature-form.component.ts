import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Feature } from 'ol';
import { OurLayer } from 'src/app/core/models/OurLayer';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss'],
})
export class FeatureFormComponent implements OnInit {
  attributes: any[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public options: {
      layer: OurLayer;
      feature: Feature;
      mode: 'show' | 'create';
    },
    public ref: MatDialogRef<FeatureFormComponent>
  ) {
    this.attributes = options.layer.value.attributes.attribute.filter(
      (attribute: any) => attribute.name !== 'the_geom'
    );
    this.attributes.map((attribute) => {
      this.form.addControl(
        attribute.name,
        new FormControl(options.feature.getProperties()[attribute.name])
      );
    });
  }

  ngOnInit(): void {}

  save() {
    this.ref.close({ form: this.form.value });
  }
}
