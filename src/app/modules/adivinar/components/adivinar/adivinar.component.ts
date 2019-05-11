import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  ValidadorNumeros } from '../../utils/validator-numeros';

@Component({
  selector: 'app-adivinar',
  templateUrl: './adivinar.component.html',
  styleUrls: ['./adivinar.component.css']
})
export class AdivinarComponent implements OnInit {

  constructor() {  }
  alertCerrada = false;
  form = new FormGroup({
    numeroingresado: new FormControl('', [Validators.minLength(4), Validators.maxLength(4)])
  }, { validators: ValidadorNumeros });
  ngOnInit() {
  }
  closeAlert(){
    this.alertCerrada = true;
  }

}
