import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  // Variables para el formulario
  usuario: string = '';
  correo: string = '';
  correo2: string = '';
  contrasena: string = '';
  contrasena2: string = '';

  // Variables para mostrar mensajes de validacion
  mensajeUsuario: string = '';
  mensajeCorreo: string = '';
  msjCorreosIguales: string = '';
  msjContrasena: string = '';
  msjContrasenasIguales: string = '';


  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    public toastController :ToastController,
  ) { }

  ngOnInit() { }
  
  validarUsuario() {
    if (this.usuario === '') {
      this.mensajeUsuario = 'El nombre de usuario es obligatorio';
    }
    else {
      this.mensajeUsuario = '';
    }
  }

  validarCorreo() {
    const correoValido = /@/;
    if (this.correo === '') {
      this.mensajeCorreo = 'El correo es obligatorio';
    }
    else if (!correoValido.test(this.correo)) {
      this.mensajeCorreo = 'Ingrese un correo valido';
    }
    else {
      this.mensajeCorreo = '';
    }
  }

  correosIguales() {
    if (this.correo !== this.correo2) {
      this.msjCorreosIguales = 'Los correos no coiciden';
    }
    else {
      this.msjCorreosIguales = '';
    }
  }

  validarContrasena() {
    const contrasenaValida = /[!@#$%^&*(),.?":{}|<>]/;
    const mayusculaValida = /[A-Z]/;

    if (this.contrasena === '') {
      this.msjContrasena = 'Debe ingresar una contraseña';
    }
    else if (this.contrasena.length < 6) {
      this.msjContrasena = 'La constraseña debe tener un minimo de 6 caracteres';
    }
    else if (!mayusculaValida.test(this.contrasena)) {
      this.msjContrasena = 'La contraseña debe tener almenos una mayuscula';
    }
    else if (!contrasenaValida.test(this.contrasena)) {
      this.msjContrasena = 'La contraseña debe tener almenos un simbolo';
    }
    else {
      this.msjContrasena = '';
    }
  }

  contrasenasIguales() {
    if (this.contrasena !== this.contrasena2) {
      this.msjContrasenasIguales = 'Las contaseñas no coiciden';
    }
    else {
      this.msjContrasenasIguales = '';
    }
  }

  async continuar() {

    // Se ejecutan las validaciones

    this.validarUsuario();
    this.validarCorreo();
    this.correosIguales();
    this.validarContrasena();
    this.contrasenasIguales();

    if (this.mensajeUsuario !== '' || this.mensajeCorreo !== '' || this.msjCorreosIguales !== '' || this.msjContrasena !== '' || this.msjContrasenasIguales !== '') {
      return;
    }

    this.presentToast('bottom');
    this.navCtrl.navigateRoot('/login');
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      // header: 'No se ha podido procesar tu solicitud',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Se Registro correctamente.',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }


}
