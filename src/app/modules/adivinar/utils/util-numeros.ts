import { AbstractControl } from '@angular/forms';

/**
 * Clase utilitaria con funciones para realizar validaciones.
 */
export class ValidatorNumeros {
  constructor() { }
}
/**
 * Retorna errores si hay números repetidos o si se ha ingresado un valor que no es número.
 * @param control FormControl a validar.
 */
export function ValidadorNumeros(control: AbstractControl) {
  const input = control.get('numeroingresado').value;
  if (isNaN(input)) {
    control.setErrors({ noEsNumero: true });
    return {
      noEsNumero: true
    };
  } else {
    // Ahora que se que es número, compruebo que los digitos no se repitan.
    const digitos = getDigitos(input);
    if (hayRepetidos(digitos)) {
      control.setErrors({ numerosRepetidos: true });
      return {
        numerosRepetidos: true
      };
    } else { return null; }

  }
}
/**
 * Devuelve los dígitos de un número, en un array.
 * @param num Número del cual se quieren obtener los dígitos.
 */
export function getDigitos(str: string): number[] {
  const digitos = Array.from(str);
  let digitosN = [];
  for (const digito of digitos) {
    digitosN.push(parseInt(digito, 10));
  }
  return digitosN;
}
/**
 * Convierte el array con digitos que recibe, a un numero entero.
 * @param digits array con digitos
 */
export function digitsToNumber(digits): number {
  let numero = '';
  let i;
  // tslint:disable-next-line: forin
  for (i in digits) {
    numero += digits[i];
  }
  return parseInt(numero, 10);
}
export function digitsToString(digits): string {
  let cadena = '';
  for (const digito of digits) {
    cadena += digito;
  }
  return cadena;
}
/**
 * Devuelve true si encuentra elementos repetidos en el arreglo que recibe como argumento.
 * @param array Array con elementos simples (no objetos) del cual se quiere
 * buscar elementos repetidos.
 */
export function hayRepetidos(array): boolean {
  const digitos = array;
  for (let index = 0; index < digitos.length; index++) {
    const element = digitos[index];
    let ocurrencias = 1;
    for (let j = 0; j < digitos.length; j++) {
      const otro = digitos[j];
      if (index !== j && element === otro) { ocurrencias++; }
    }
    if (ocurrencias > 1) {
      return true;
    }
  }
  return false;
}
export function contarCifrasCorrectas(digitos, original) {
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
export function contarAciertos(digitos, original) {
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
export function compararNumeros(digitos, original) {
  const correctos = contarCifrasCorrectas(digitos, original);
  const aciertos = contarAciertos(digitos, original);
  const desordenadas = aciertos - correctos;
  return{
    ordenadas: correctos,
    desordenadas
  };
}
