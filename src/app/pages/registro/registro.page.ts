import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  correo = '';
  contrasena = '';
  usuario = '';
  mail = '';
  contrasena2 = '';
  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    public toastController :ToastController,
  ) { }

  ngOnInit() {}
  async continuar() {
    // if (this.correo === '' || this.contrasena === '' || this.usuario === '' || this.mail === '') {
    //   this.mostrarAlerta('Debe ingresar correo y contraseña');
    // } else {
    //   this.presentToast('bottom')
    //   this.navCtrl.navigateRoot('/home');
    // }
    if (this.usuario === '') {
      this.mostrarAlerta('Ingrese un nombre de usuario');
      return;
    }
    if (this.correo === '') {
      this.mostrarAlerta('Por favor ingrese un correo');
      return;
    }
    if (!this.correo.includes('@')) {
      this.mostrarAlerta('Ingrese un correo valido');
      return;
    }
    if (this.correo !== this.mail) {
      this.mostrarAlerta('Los correos no coinciden');
      return;
    }
    if (this.contrasena === '') {
      this.mostrarAlerta('Debe ingresar una contraseña');
      return;
    }
    if (this.contrasena !== this.contrasena2) {
      this.mostrarAlerta('Las contraseñas no coiciden');
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
