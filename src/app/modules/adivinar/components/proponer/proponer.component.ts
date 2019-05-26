import { Component, OnInit } from '@angular/core';
import { sampleSize } from 'lodash';
import { digitsToString, getDigitos, contarCifrasCorrectas, contarAciertos, compararNumeros, hayRepetidos } from '../../utils/util-numeros';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {
    // Genera el primer número de forma totalmente aleatoria.
    this.lastNumber =  {
      value: sampleSize([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4).join(''),
      relativeTo: '',
      desordenadas: 0,
      ordenadas: 0,
      puntaje: 0
    };
   }

  ngOnInit() {
  }
  enviar() {

    // Guardar lo que ingresó la persona en desordenadas y ordenadas.
    const valor = this.lastNumber.value;
    const ordenadas = this.form.get('inputOrdenadas').value;
    const desordenadas = this.form.get('inputDesordenadas').value;
    const puntaje = 2 * ordenadas + desordenadas;
    this.numerosPropuestos.push( { value: valor,desordenadas, ordenadas, relativeTo: '', puntaje });
    // Generar numero basado en lo ingresado.
    if (ordenadas === 4) {
      Swal.fire({
        title: '¡Adiviné!',
        type: 'success',
        text: "Serás redirigido al inicio."
      }).then( () => {
        this.router.navigate(['/']);
      });
    }else{
      this.form.reset();
      this.lastNumber.value = this.generarNumero();
      this.lastNumber.relativeTo = valor;
    }
    

  }

  /**
   * Devuelve una puntuación, suma 2 si la cifra es correcta, y 1 para las desordenadas.
   * @param numerito Objeto Numero a puntuar.
   */
  puntuarNumero(numerito: Numero) {
    return 2 * numerito.ordenadas + numerito.desordenadas;
  }
  generarNumero() {
      const arrayPuntajes = Array.from(this.numerosPropuestos, numero => numero.puntaje);
      const maxPuntaje = Math.max(...arrayPuntajes);
      const numeroBase = this.numerosPropuestos[this.numerosPropuestos.findIndex( element => element.puntaje === maxPuntaje)];
      let numeroBaseInt = parseInt(numeroBase.value, 10);
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
        const comparacion = compararNumeros(generado, getDigitos(numeroBase.value));
        const cntCorrectas = comparacion.ordenadas;
        const cntDesordenadas = comparacion.desordenadas;
        const generadoStr = digitsToString(generado);

        if (cntCorrectas === numeroBase.ordenadas && cntDesordenadas === numeroBase.desordenadas && !hayRepetidos(generado)
            && ( this.numerosPropuestos.findIndex( element => element.value == generadoStr) === -1) ) {
          retornable = true;
        }
      }
      return digitsToString(generado);
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
  puntaje: number;
  }

