import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFormComponent } from './feature-form/feature-form.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MATERIAL = [MatFormFieldModule, MatInputModule, MatDialogModule];
const FORMS = [FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [FeatureFormComponent],
  imports: [CommonModule, ...MATERIAL, ...FORMS],
  exports: [...MATERIAL, ...FORMS],
})
export class ComponentsModule {}
