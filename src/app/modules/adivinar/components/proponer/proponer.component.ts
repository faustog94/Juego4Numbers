import { Component, OnInit } from '@angular/core';
import { sampleSize } from 'lodash';
import { digitsToString } from '../../utils/util-numeros';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-proponer',
  templateUrl: './proponer.component.html',
  styleUrls: ['./proponer.component.css']
})


export class ProponerComponent implements OnInit {
  lastNumber: Numero;
  numerosPropuestos;
  lastFeedback;
  form = new FormGroup(
    {
      inputOrdenadas: new FormControl(),
      inputDesordenadas: new FormControl()
    },
    { validators: ValidarCantidades }
  );
  constructor() {
    // Genera el primer número de forma totalmente aleatoria.
    this.lastNumber =  {
      value: digitsToString(sampleSize([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4)),
      relativeTo: '',
      desordenadas: 0,
      ordenadas: 0
    };
   }

  ngOnInit() {}
  enviar() {}
}
export function ValidarCantidades(control: AbstractControl) {
  const ordenadas = control.get('inputOrdenadas').value;
  const desordenadas = control.get('inputDesordenadas').value;
  if ((ordenadas + desordenadas) > 4) {
    control.setErrors({ cantidadSuperada: true });
    return {
      cantidadSuperada: true
    };
  } else { return null; }
}
interface Numero {
  value: string;
  relativeTo: string;
  ordenadas: number;
  desordenadas: number;
  }

