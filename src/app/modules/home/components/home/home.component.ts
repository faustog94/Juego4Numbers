import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mensajeAdivinar: string;
  mensajeProponer: string;
  constructor() { }

  ngOnInit() {
    this.mensajeAdivinar = `Tienes que adivinar un número de 4 cifras distintas que generará la máquina.
     Como pista recibirás la cantidad de cifras bien ubicadas, y de cifras desordenadas.`;
    this.mensajeProponer = `Tienes que proponer un número de 4 cifras distintas y decirle a la máquina cuantos están bien ubicados,
    o bien pero mal ubicados.`;
  }

}
