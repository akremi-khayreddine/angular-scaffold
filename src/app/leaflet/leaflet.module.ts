import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeafletRoutingModule } from './leaflet-routing.module';
import { LeafletComponent } from './leaflet.component';

import { LeafletModule as LeafletLibModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [LeafletComponent],
  imports: [CommonModule, LeafletRoutingModule, LeafletLibModule],
})
export class LeafletModule {}
