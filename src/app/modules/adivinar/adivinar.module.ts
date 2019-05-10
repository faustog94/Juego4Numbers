import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdivinarRoutingModule } from './adivinar-routing.module';
import { AdivinarComponent } from './components/adivinar/adivinar.component';

@NgModule({
  declarations: [ AdivinarComponent],
  imports: [
    CommonModule,
    AdivinarRoutingModule
  ]
})
export class AdivinarModule { }
