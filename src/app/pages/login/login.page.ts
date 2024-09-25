import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  usuario: string = '';
  contrasena: string = '';

  //Variables de validaciones
  msjUsuario: string = '';
  msjContrasena: string = '';
  
  constructor(
    public toastController :ToastController,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {}

  ngOnInit() { }
  
  validarUsuario() {
    if (this.usuario === '') {
      this.msjUsuario = 'Debe ingresar su usuario';
    }
    else {
      this.msjUsuario = '';
    }
  }

  validarContrasena() {
    if (this.contrasena === '') {
      this.msjContrasena = 'Debe ingresar su contraseña';
    }
    else {
      this.msjContrasena = '';
    }
  }

  continuar() {
    
    this.validarUsuario();
    this.validarContrasena();

    if (this.msjUsuario !== '' || this.msjContrasena !== '') {
      return;
    }

    localStorage.setItem('usuarioLogeado', this.usuario);

    this.presentToast('bottom')
    this.navCtrl.navigateRoot('/home');
    
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
