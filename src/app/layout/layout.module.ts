import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavHeaderComponent } from './sidenav/sidenav-header/sidenav-header.component';

const MATERIALS = [
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule,
];

@NgModule({
  declarations: [ToolbarComponent, SidenavComponent, SidenavHeaderComponent],
  imports: [CommonModule, FlexLayoutModule, ...MATERIALS],
  exports: [ToolbarComponent, SidenavComponent],
})
export class LayoutModule {}
