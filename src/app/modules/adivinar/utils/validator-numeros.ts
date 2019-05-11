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
    if ( isNaN( input ) ) {
        control.setErrors( {noEsNumero: true} );
        return  {
          noEsNumero: true
        };
    } else {
        // Ahora que se que es número, compruebo que los digitos no se repitan.
        const digitos = getDigitos(input);
        if (hayRepetidos(digitos)) {
            control.setErrors({ numerosRepetidos: true });
            return{
                numerosRepetidos: true
            };
        } else { return null; }

    }
  }
/**
 * Devuelve los dígitos de un número, en un array.
 * @param num Número del cual se quieren obtener los dígitos.
 */
export function getDigitos(num: number): number[] {
    const digitos = [];
    while (num > 0) {
        digitos[digitos.length] = num % 10; // Retorna el resto de dividir por 10.
        num = parseInt( (num / 10).toString(), 10 ) ; // Le quito una cifra
    }
    digitos.reverse(); // Reordeno el array para que me muestre los digitos bien.
    return digitos;
  }
/**
 * Devuelve true si encuentra elementos repetidos en el arreglo que recibe como argumento.
 * @param array Array con elementos simples (no objetos) del cual se quiere
 * buscar elementos repetidos.
 */
function hayRepetidos(array): boolean {
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
