import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidadorNumeros, getDigitos, hayRepetidos, digitsToNumber } from '../../utils/util-numeros';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adivinar',
  templateUrl: './adivinar.component.html',
  styleUrls: ['./adivinar.component.css']
})
export class AdivinarComponent implements OnInit {
  digitosNumero: any;
  intNumero: number;
  constructor() { }

  alertCerrada = false;
  form = new FormGroup({
    numeroingresado: new FormControl('', [Validators.minLength(4), Validators.maxLength(4)])
  }, { validators: ValidadorNumeros });
  ngOnInit() {
    const x = generarNumero();
    this.digitosNumero = x;
    this.intNumero = digitsToNumber(this.digitosNumero);
    console.log('Generado: ' + this.intNumero);
  }

  enviar() {
    console.warn('Entro al onsubmit');
    const valorIngresado = this.form.get('numeroingresado').value;
    const digitos = getDigitos(valorIngresado);
    const aciertos = contarCifrasAcertadas(digitos, this.digitosNumero);
    const correctos = contarCifrasCorrectas(digitos, this.digitosNumero);
    const desordenadas = aciertos - correctos;
    if( aciertos === 4){
      Swal.fire('Felicitaciones', 'Has ganado! El número correcto es '+this.intNumero, 'success' );
    }else{
      Swal.fire('No acertaste', `Cifras ordenadas: ${correctos} \n.
      Cifras desordenadas: ${desordenadas}`, 'warning' );
    }
  }
}
function generarNumero() {
  debugger;
  const random = parseInt( (Math.random() * 10000).toString(), 10).toString();
  const digits = getDigitos(random);
  if (!hayRepetidos(digits) && digits.length === 4) {
    return digits;
  } else {
    return generarNumero();
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
      if (digitooriginal === digito) { cantidadCifrasAcertadas++; }
    }
  }
  return cantidadCifrasAcertadas;
}
