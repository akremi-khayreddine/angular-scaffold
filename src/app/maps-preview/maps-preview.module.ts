import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsPreviewRoutingModule } from './maps-preview-routing.module';
import { MapsPreviewComponent } from './maps-preview.component';


@NgModule({
  declarations: [MapsPreviewComponent],
  imports: [
    CommonModule,
    MapsPreviewRoutingModule
  ]
})
export class MapsPreviewModule { } 
