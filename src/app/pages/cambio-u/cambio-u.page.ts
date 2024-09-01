import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cambio-u',
  templateUrl: './cambio-u.page.html',
  styleUrls: ['./cambio-u.page.scss'],
})
export class CambioUPage implements OnInit {

  correo = '';
  
  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    public toastController :ToastController,
  ) { }

  ngOnInit() {}
  async continuar() {
    if ( this.correo === '') {
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
      message: 'El Correo Se  Actualizo correctamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
