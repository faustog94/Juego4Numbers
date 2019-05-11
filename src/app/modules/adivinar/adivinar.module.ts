import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Componentes y Routing */
import { AdivinarRoutingModule } from './adivinar-routing.module';
import { AdivinarComponent } from './components/adivinar/adivinar.component';
import { ProponerComponent } from './components/proponer/proponer.component';

/* Para lanzar modals de Ng-Boostrap */
import { NgbModalModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

/* Reactive Forms Module se utiliza para realizar la validacion de los inputs de un form */
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ AdivinarComponent, ProponerComponent],
  imports: [
    CommonModule,
    AdivinarRoutingModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbAlertModule
  ]
})
export class AdivinarModule { }
