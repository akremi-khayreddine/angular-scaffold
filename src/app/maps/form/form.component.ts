import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Feature } from 'ol';
import { OurLayer } from 'src/app/core/services/geoserver.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  attributes: any[] = [];
  form: FormGroup = new FormGroup({});
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public options: {
      layer: OurLayer;
      feature: Feature;
      mode: 'show' | 'create';
    },
    public ref: MatDialogRef<FormComponent>
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
