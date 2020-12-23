import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * Material
 */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { mapOptions, MAP_OPTIONS } from './core/services/map-options';
import { OverlayModule } from '@angular/cdk/overlay';

const MATERIALS = [MatToolbarModule, MatSidenavModule];
const LAYOUT = [LayoutModule];
@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ...MATERIALS,
    ...LAYOUT,
    OverlayModule
  ],
  providers: [{ provide: MAP_OPTIONS, useValue: mapOptions }],
  bootstrap: [AppComponent],
})
export class AppModule {}
