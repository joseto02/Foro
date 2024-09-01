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
  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    public toastController :ToastController,
  ) { }

  ngOnInit() {}
  async continuar() {
    if (this.correo === '' || this.contrasena === '' || this.usuario === '' || this.mail === '') {
      this.mostrarAlerta('Debe ingresar correo y contraseña');
    } else {
      this.presentToast('bottom')
      this.navCtrl.navigateRoot('/home');
    }
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
      message: 'se Registro correctamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
