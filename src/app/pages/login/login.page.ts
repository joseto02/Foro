import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo = '';
  contrasena = '';

  usuarios: any = [
    {
      correo: '',
      contrasena: ''
    }
  ]

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}

  async continuar() {
    if (this.correo === '' || this.contrasena === '') {
      this.mostrarAlerta('Debe ingresar correo y contraseña');
    } else {
      // Navega a la página de inicio
      this.navCtrl.navigateRoot('/home');
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
  
}
