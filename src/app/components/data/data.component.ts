import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { reject } from 'q';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;
  usuario: Object = {
    nombreCompleto: {
      nombre: 'Fredy',
      apellido: 'Fuentes'
    },
    correo: 'fredy.fuentesb@gmail.com',
    pasatiempos: ['Correr', 'Dormi', 'Comer']
  };

  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
        apellido: new FormControl('', [Validators.required, this.noFuentes])
      }),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      pasatiempos: new FormArray([new FormControl('', Validators.required)]),
      username: new FormControl('', Validators.required, this.existeUsuario),
      password1: new FormControl('', Validators.required),
      password2: new FormControl()
    });

    //this.forma.setValue(this.usuario);

    this.forma.controls.password2.setValidators([Validators.required, this.noIgual.bind(this.forma)]);

    this.forma.controls.username.valueChanges.subscribe(data => console.log(data));
    this.forma.controls.username.statusChanges.subscribe(data => console.log(data));
  }

  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push(new FormControl('Dormir', Validators.required));
  }

  noFuentes(control: FormControl): {[s: string]: boolean}{
    if(control.value === 'fuentes'){
      return{
        noFuentes: true
      }
    }
    return null;
  }

  noIgual(control: FormControl): {[s: string]: boolean} {
    let forma: any = this;
    if(control.value !== forma.controls.password1.value){
      return{
        noiguales: true
      }
    }
    return null;
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    let promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'strider'){
          resolve({existe: true});
        } else{
          resolve(null);
        }
      }, 3000);
    });
    return promesa;
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);
    
    //this.forma.reset();
  }

}
