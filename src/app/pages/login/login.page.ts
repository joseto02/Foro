import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login() {
    throw new Error('Method not implemented.');
  }
  correo = '';
  contrasena = '';
  loginForm: any;
  private adminEmails: string[] = ['admin@gamernest.com'];
  constructor(
    public toastController :ToastController,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}
  async continuar() {
    if (this.correo === '' || this.contrasena === '') {
      this.mostrarAlerta('Debe ingresar correo y contraseña');
    } else {
      this.presentToast('bottom');

   
      if (this.adminEmails.includes(this.correo)) {
      
        this.navCtrl.navigateRoot('/admin');
      } else {
        this.navCtrl.navigateRoot('/home');
      }
    }
  }
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'No se ha podido procesar tu solicitud',
      message: 'Debe ingresar correo y contraseña',
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'se inicio sesion correctamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }



}
