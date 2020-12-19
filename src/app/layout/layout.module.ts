import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavHeaderComponent } from './sidenav/sidenav-header/sidenav-header.component';

const MATERIALS = [MatButtonModule, MatIconModule];

@NgModule({
  declarations: [ToolbarComponent, SidenavComponent, SidenavHeaderComponent],
  imports: [CommonModule, FlexLayoutModule, ...MATERIALS],
  exports: [ToolbarComponent, SidenavComponent],
})
export class LayoutModule {}
