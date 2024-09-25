import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cambio-u',
  templateUrl: './cambio-u.page.html',
  styleUrls: ['./cambio-u.page.scss'],
})
export class CambioUPage implements OnInit {

  correoActual: string = '';
  newCorreo: string = '';
  newCorreo2: string = '';

  //Variables para los mensajes
  msjCorreoActual: string = '';
  msjNewCorreo: string = '';
  msjvalidacion: string = '';
  
  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private toastController :ToastController,
  ) { }

  ngOnInit() { }

  validarCorreo() {
    const correoValido = /@/;

    if (this.correoActual === '') {
      this.msjCorreoActual = 'Debe ingresar su correo actual';
    }
    else if (!correoValido.test(this.correoActual)) {
      this.msjCorreoActual = 'Debe ingresar un correo valido';
    }
    else {
      this.msjCorreoActual = '';
    }
  }

  validarNewCorreo() {
    const correoValido = /@/;

    if (this.newCorreo === '') {
      this.msjNewCorreo = 'Debe ingresar un nuevo correo';
    }
    else if (this.newCorreo == this.correoActual) {
      this.msjNewCorreo = 'El nuevo correo no puede ser igual al actual'
    }
    else if (!correoValido.test(this.newCorreo)) {
      this.msjNewCorreo = 'Debe ingresar un correo valido';
    }
    else {
      this.msjNewCorreo = '';
    }
  }

  validarCorreos() {
    if (this.newCorreo !== this.newCorreo2) {
      this.msjvalidacion = 'Los correos no coiciden';
    }
    else {
      this.msjvalidacion = '';
    }
  }
  
  async continuar() {

    this.validarCorreo();
    this.validarNewCorreo();
    this.validarCorreos();

    if (this.msjCorreoActual !== '' || this.msjNewCorreo !== '' || this.msjvalidacion !== '') {
      return;
    }

    this.presentToast('bottom')
    this.navCtrl.navigateRoot('/home');
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'No se ha podido procesar tu solicitud',
      message: '¡debe rellenar las casillas! ',
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'El Correo Se  Actualizo correctamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
