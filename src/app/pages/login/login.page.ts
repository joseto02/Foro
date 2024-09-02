import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario = '';
  correo = '';
  contrasena = '';
  
  constructor(
    public toastController :ToastController,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}

  async continuar() {
    if (this.usuario === '' || this.contrasena === '') {
      this.mostrarAlerta('Debe ingresar usuario y contraseña');
    } else {
      
      localStorage.setItem('usuarioLogeado', this.usuario);

      this.presentToast('bottom')
      this.navCtrl.navigateRoot('/home');
    }
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'No se ha podido procesar tu solicitud',
      message: 'Debe ingresar usuario y contraseña',
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Se inicio sesion correctamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
