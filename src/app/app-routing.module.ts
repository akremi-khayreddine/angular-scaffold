import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./maps/maps.module').then((m) => m.MapsModule),
  },
  {
    path: 'leaflet',
    loadChildren: () =>
      import('./leaflet/leaflet.module').then((m) => m.LeafletModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
