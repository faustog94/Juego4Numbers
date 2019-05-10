import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdivinarComponent } from './modules/adivinar/components/adivinar/adivinar.component';
import { HomeComponent } from './modules/home/components/home/home.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: ''
  },
  {
    component: AdivinarComponent,
    path: 'adivinar'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
