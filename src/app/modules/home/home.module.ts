import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NgbTooltipModule,
    AppRoutingModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
