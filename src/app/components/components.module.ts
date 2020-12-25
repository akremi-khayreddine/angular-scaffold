import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFormComponent } from './feature-form/feature-form.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureDetailsComponent } from './feature-details/feature-details.component';
import { MatIconModule } from '@angular/material/icon';

const MATERIAL = [
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatIconModule,
];
const FORMS = [FormsModule, ReactiveFormsModule];

const COMPONENTS = [FeatureFormComponent, FeatureDetailsComponent];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MATERIAL, ...FORMS, ...COMPONENTS],
  exports: [...MATERIAL, ...FORMS, ...COMPONENTS],
})
export class ComponentsModule {}
