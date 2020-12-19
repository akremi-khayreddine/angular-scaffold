import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const MATERIALS = [MatCardModule, MatButtonModule];

@NgModule({
  declarations: [HomeComponent, StudentComponent],
  imports: [CommonModule, PagesRoutingModule, ...MATERIALS],
  exports: [HomeComponent, StudentComponent],
})
export class PagesModule {}
