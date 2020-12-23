import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapsPreviewComponent } from './maps-preview.component';

const routes: Routes = [
  {
    path: '',
    component: MapsPreviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsPreviewRoutingModule {}
