import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ServiciobdService } from 'src/app/services/serviciobd.service';

@Component({
  selector: 'app-moderador',
  templateUrl: './moderador.page.html',
  styleUrls: ['./moderador.page.scss'],
})
export class ModeradorPage implements OnInit {

  // Variables para el formulario
  nickName: string = '';
  correo: string = '';
  correo2: string = '';
  clave: string = '';
  contrasena2: string = '';

  // Variables para mostrar mensajes de validacion
  mensajeUsuario: string = '';
  mensajeCorreo: string = '';
  msjCorreosIguales: string = '';
  msjContrasena: string = '';
  msjContrasenasIguales: string = '';


  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private bd: ServiciobdService,
  ) { }

  ngOnInit() { }

  validarUsuario() {
    if (this.nickName === '') {
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

    if (this.clave === '') {
      this.msjContrasena = 'Debe ingresar una contraseña';
    }
    else if (this.clave.length < 6) {
      this.msjContrasena = 'La constraseña debe tener un minimo de 6 caracteres';
    }
    else if (!mayusculaValida.test(this.clave)) {
      this.msjContrasena = 'La contraseña debe tener almenos una mayuscula';
    }
    else if (!contrasenaValida.test(this.clave)) {
      this.msjContrasena = 'La contraseña debe tener almenos un simbolo';
    }
    else {
      this.msjContrasena = '';
    }
  }

  contrasenasIguales() {
    if (this.clave !== this.contrasena2) {
      this.msjContrasenasIguales = 'Las contaseñas no coiciden';
    }
    else {
      this.msjContrasenasIguales = '';
    }
  }

  agregar() {
    this.bd.agregarModerador(this.nickName, this.correo, this.clave);
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

    this.agregar();
    this.presentToast('bottom');
    this.navCtrl.navigateRoot('/admin');
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Moderador se registro correctamente.',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }


}
