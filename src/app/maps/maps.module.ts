import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps.component';
import { FormComponent } from './form/form.component';
import { IntractionsComponent } from './intractions/intractions.component';
import { LegendComponent } from './legend/legend.component';
import { FeatureDetailsComponent } from './feature-details/feature-details.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MATERIALS = [
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  FlexLayoutModule,
  MatCheckboxModule,
  MatMenuModule,
];

const FORMS = [FormsModule, ReactiveFormsModule];

const COMPONENTS = [
  FormComponent,
  IntractionsComponent,
  LegendComponent,
  FeatureDetailsComponent,
];

@NgModule({
  declarations: [MapsComponent, ...COMPONENTS],
  imports: [CommonModule, MapsRoutingModule, ...MATERIALS, ...FORMS],
  providers: [],
})
export class MapsModule {}
