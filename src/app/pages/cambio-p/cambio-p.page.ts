import { Component, OnInit } from '@angular/core';
import { AlertController, NavController} from '@ionic/angular';
import { ServiciobdService } from 'src/app/services/serviciobd.service';

@Component({
  selector: 'app-cambio-p',
  templateUrl: './cambio-p.page.html',
  styleUrls: ['./cambio-p.page.scss'],
})
export class CambioPPage implements OnInit {
  contrasenaActual: string = '';
  newPassword: string = '';
  password2: string = '';

  // Mensajes de validacion
  msjContrasena: string = '';
  msjNuevaContrasena: string = '';
  msjContrasenasIguales: string = '';
  
  arregloUsuario: any = [{
    id_usuario: '',
    nickName: '',
    clave: '',
    coreo: '',
    foto: '',
    estado: '',
    id_rol: ''
  }]

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private db: ServiciobdService
  ) { }

  ngOnInit() {
    this.db.dbState().subscribe(data => {
      if (data) {
        this.db.fetchUsuario().subscribe(res => {
          this.arregloUsuario = res;
        })
      }
    })
  }

  validarContrasena() {
    if (this.contrasenaActual === '') {
      this.msjContrasena = 'Debe ingresar su contraseña actual';
    }
    else {
      this.msjContrasena = '';
    }
  }

  validarNuevaContrasena() {
    const contrasenaValida = /[!@#$%^&*(),.?":{}|<>]/;
    const mayusculaValida = /[A-Z]/;

    if (this.newPassword === '') {
      this.msjNuevaContrasena = 'Debe ingresar una nueva contraseña';
    }
    else if (this.newPassword == this.contrasenaActual) {
      this.msjNuevaContrasena = 'Debe ingresar una contraseña diferente a la actual';
    }
    else if (this.newPassword.length < 6) {
      this.msjNuevaContrasena = 'La constraseña debe tener un minimo de 6 caracteres';
    }
    else if (!mayusculaValida.test(this.newPassword)) {
      this.msjNuevaContrasena = 'La contraseña debe tener almenos una mayuscula';
    }
    else if (!contrasenaValida.test(this.newPassword)) {
      this.msjNuevaContrasena = 'La contraseña debe tener almenos un simbolo';
    }
    else {
      this.msjNuevaContrasena = '';
    }
  }

  validarContrasenas() {
    if (this.newPassword !== this.password2) {
      this.msjContrasenasIguales = 'No coincide con la nueva contraseña';
    }
    else {
      this.msjContrasenasIguales = '';
    }
  }

  modificarContrasena() {
    
  }
  
  async continuar() {
    
    //Primero hay que hacer las validaciones
    this.validarContrasena();
    this.validarNuevaContrasena();
    this.validarContrasenas();

    //verficar que no hay alertas en las validaciones
    if (this.msjContrasena !== '' || this.msjNuevaContrasena !== '' || this.msjContrasenasIguales !== '') {
      return;
    } 

    
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
  
}
