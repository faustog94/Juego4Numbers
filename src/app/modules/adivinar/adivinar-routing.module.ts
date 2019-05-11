import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProponerComponent } from './components/proponer/proponer.component';


const routes: Routes = [
  {
    component: ProponerComponent,
    path: 'retar'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdivinarRoutingModule { }
