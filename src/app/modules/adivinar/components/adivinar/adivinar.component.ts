import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidadorNumeros, getDigitos, compararNumeros } from '../../utils/util-numeros';
import Swal from 'sweetalert2';
import { sampleSize } from 'lodash';
@Component({
  selector: 'app-adivinar',
  templateUrl: './adivinar.component.html',
  styleUrls: ['./adivinar.component.css']
})
export class AdivinarComponent implements OnInit {
  digitosNumero: any;
  intNumero: string;
  cantidadIntentos = 0;
  constructor() {}

  alertCerrada = false;
  form = new FormGroup(
    {
      numeroingresado: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(4)
      ])
    },
    { validators: ValidadorNumeros }
  );
  ngOnInit() {
    this.digitosNumero = sampleSize([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4);
    let numberDisplay = '';
    this.digitosNumero.forEach(element => {
      numberDisplay += element;
    });
    this.intNumero = numberDisplay;
    console.log(this.intNumero);
  }

  enviar() {
    this.cantidadIntentos++;
    const valorIngresado = this.form.get('numeroingresado').value;
    const digitos = getDigitos(valorIngresado);
    const comparacion = compararNumeros(digitos, this.digitosNumero);
    const desordenadas = comparacion.desordenadas;
    const correctos = comparacion.ordenadas;
    if (correctos === 4) {
      Swal.fire(
        '¡Felicitaciones, Ganaste!',
        `El número correcto es  ${this.intNumero}.
      Realizaste ${this.cantidadIntentos} intentos hasta lograrlo.`,
        'success'
      );
    } else {
      Swal.fire(
        'No acertaste',
        `Cifras ordenadas: ${correctos} \n.
      Cifras desordenadas: ${desordenadas}`,
        'warning'
      );
    }
  }
}
function contarCifrasCorrectas(digitos, original) {
  let cantidadCifrasCorrectas = 0;
  let i;
  // tslint:disable-next-line: forin
  for (i in digitos) {
    // tslint:disable-next-line: one-line
    if (digitos[i] === original[i]) {
      cantidadCifrasCorrectas += 1;
    }
  }
  return cantidadCifrasCorrectas;
}
function contarCifrasAcertadas(digitos, original) {
  let cantidadCifrasAcertadas = 0;
  for (const digito of digitos) {
    for (const digitooriginal of original) {
      if (digitooriginal === digito) {
        cantidadCifrasAcertadas++;
      }
    }
  }
  return cantidadCifrasAcertadas;
}
