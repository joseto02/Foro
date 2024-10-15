import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cambio-p',
  templateUrl: './cambio-p.page.html',
  styleUrls: ['./cambio-p.page.scss'],
})
export class CambioPPage implements OnInit {
  contrasenaActual: string = '';
  contrasenaIngresada: string = '';
  newPassword: string = '';
  password2: string = '';

  // Mensajes de validacion
  msjContrasena: string = '';
  msjNuevaContrasena: string = '';
  msjContrasenasIguales: string = '';

  usuario: string = "";
  id: string = "";

  
  

  constructor(private db: ServiciobdService, private router: Router, private storage: StorageService, private toastController: ToastController) {}

  async ngOnInit() {

    this.storage.getNickName().subscribe(res => {
      this.usuario = res || '';
    })

    //id del usaurio
    this.id = await this.db.obtenerIdUsuario(this.usuario);

    //clave actual
    this.contrasenaActual = await this.db.obtenerClave(this.usuario);

  }

  validarContrasena() {
    if (this.contrasenaIngresada === '') {
      this.msjContrasena = 'Este campo es obligatorio';
    }
    else if (this.contrasenaIngresada !== this.contrasenaActual) {
      this.msjContrasena = 'Su contraseña actual no coincide';
    }
    else {
      this.msjContrasena = '';
    }
  }

  validarNuevaContrasena() {
    const contrasenaValida = /[!@#$%^&*(),.?":{}|<>]/;
    const mayusculaValida = /[A-Z]/;

    if (this.newPassword === '') {
      this.msjNuevaContrasena = 'Debe ingresar una nueva contraseña';
    }
    else if (this.newPassword == this.contrasenaActual) {
      this.msjNuevaContrasena = 'Debe ingresar una contraseña diferente a la actual';
    }
    else if (this.newPassword.length < 6) {
      this.msjNuevaContrasena = 'La constraseña debe tener un minimo de 6 caracteres';
    }
    else if (!mayusculaValida.test(this.newPassword)) {
      this.msjNuevaContrasena = 'La contraseña debe tener almenos una mayuscula';
    }
    else if (!contrasenaValida.test(this.newPassword)) {
      this.msjNuevaContrasena = 'La contraseña debe tener almenos un simbolo';
    }
    else {
      this.msjNuevaContrasena = '';
    }
  }

  validarContrasenas() {
    if (this.newPassword !== this.password2) {
      this.msjContrasenasIguales = 'No coincide con la nueva contraseña';
    }
    else {
      this.msjContrasenasIguales = '';
    }
  }


  
  async continuar() {
    
    //Primero hay que hacer las validaciones
    this.validarContrasena();
    this.validarNuevaContrasena();
    this.validarContrasenas();

    //verficar que no hay alertas en las validaciones
    if (this.msjContrasena !== '' || this.msjNuevaContrasena !== '' || this.msjContrasenasIguales !== '') {
      return;
    } 

    await this.db.cambiarContrasena(this.id, this.newPassword);
    await this.router.navigate(['/configuracion']);
    await this.presentToast("middle");
    
  }


  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Se cambio la contraseña exitosamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  
}
