import { Component, OnInit } from '@angular/core';
import { sampleSize } from 'lodash';
import { digitsToString, getDigitos, contarCifrasCorrectas, contarAciertos, compararNumeros, hayRepetidos } from '../../utils/util-numeros';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-proponer',
  templateUrl: './proponer.component.html',
  styleUrls: ['./proponer.component.css']
})


export class ProponerComponent implements OnInit {
  lastNumber: Numero;
  numerosPropuestos: Array<Numero> = [];
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
  enviar() {
    const numeroAnterior = this.lastNumber.value;
    // Guardar lo que ingresó la persona en desordenadas y ordenadas.
    this.lastNumber.ordenadas = this.form.get('inputOrdenadas').value;
    this.lastNumber.desordenadas = this.form.get('inputDesordenadas').value;
    this.numerosPropuestos.push(this.lastNumber);
    console.log(this.numerosPropuestos);
    // Generar numero basado en lo ingresado.
    if (this.lastNumber.ordenadas === 4) {
      alert('Ganeeee madafaca');
    }else{
      this.form.reset();
      this.lastNumber.value = this.generarNumero(numeroAnterior, this.lastNumber.ordenadas, this.lastNumber.desordenadas);
    }
    alert(`Nuevo numero: ${this.lastNumber.value}`);

  }

  /**
   * Devuelve una puntuación, suma 2 si la cifra es correcta, y 1 para las desordenadas.
   * @param numerito Objeto Numero a puntuar.
   */
  puntuarNumero(numerito: Numero) {
    return 2 * numerito.ordenadas + numerito.desordenadas;
  }
  generarNumero(numeroBase: string = null, ordenadas: number = 0, desordenadas: number = 0) {
    if (numeroBase) {
      let numeroBaseInt = parseInt(numeroBase, 10);
      let generado;
      let retornable = false;
      while (!retornable) {
        numeroBaseInt++;
        if (numeroBaseInt >= 10000){
          numeroBaseInt = 123; // Reseteo!
        }
        generado = getDigitos(numeroBaseInt.toString());
        // Para aquellos numeros que tienen un 0 y lo pierden en el parseInt.
        generado = (generado.length === 4) ? generado : generado.unshift(0);
        const comparacion = compararNumeros(generado, getDigitos(numeroBase));
        const cntCorrectas = comparacion.ordenadas;
        const cntDesordenadas = comparacion.desordenadas;
        if (cntCorrectas === ordenadas && cntDesordenadas === desordenadas && !hayRepetidos(generado)) {
          retornable = true;
        }
      }
      console.log(digitsToString(generado));
      return digitsToString(generado);
    } else {
      // Genera un numero totalmente aleatorio
      return digitsToString(sampleSize([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4));
    }
  }
}

function ValidarCantidades(control: AbstractControl) {
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

