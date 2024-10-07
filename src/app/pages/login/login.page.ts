import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  nickName: string = '';
  clave: string = '';

  //Variables de validaciones
  msjUsuario: string = '';
  msjContrasena: string = '';
  
  constructor(
    public toastController :ToastController,
    public alertController: AlertController,
    public navCtrl: NavController,
    private bd: ServiciobdService,
  ) {}

  ngOnInit() { }
  
  validarUsuario() {
    if (this.nickName === '') {
      this.msjUsuario = 'Debe ingresar su usuario';
    }
    else {
      this.msjUsuario = '';
    }
  }

  validarContrasena() {
    if (this.clave === '') {
      this.msjContrasena = 'Debe ingresar su contraseña';
    }
    else {
      this.msjContrasena = '';
    }
  }

  async verificarUsuario() {
    const usuExiste = await this.bd.inicioSesion(this.nickName, this.clave);

    if (!usuExiste) {
      this.mostrarAlerta('Error al inciar sesion', 'Usuario y/o contraseña no coiciden');
    }

    return usuExiste;
  }

  async continuar() {
    
    this.validarUsuario();
    this.validarContrasena();

    if (this.msjUsuario !== '' || this.msjContrasena !== '') {
      return;
    }


    const usuExiste = await this.verificarUsuario();

    if (!usuExiste) {
      return;
    }


    this.presentToast('bottom');
    this.navCtrl.navigateRoot('/home');
    
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
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
