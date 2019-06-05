import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent {
  
  usuario: UsuarioModel = new UsuarioModel();

  paises = [{
    codigo: 'COL',
    nombre: 'Colombia'
  }, {
    codigo: 'CRI',
    nombre: 'Costa Rica'
  },{
    codigo: 'ESP',
    nombre: 'España'
  }];

  sexos = ['Masculino', 'Femenino', 'Sin Definir'];

  constructor() {
    this.usuario.nombre = null;
    this.usuario.apellido = null;
    this.usuario.email = null;
    this.usuario.pais = '';
    this.usuario.sexo = 'Masculino';
    this.usuario.acepta = false;
   }

  guardar(forma: NgForm) {
    console.log('Formulario Posteado');
    console.log('ngForm', forma);
    console.log('Valor', forma.value);
    console.log('Usuario', this.usuario);
  }

}
