import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private alertController: AlertController) { }
  
  irPagina() {
    this.router.navigate(['/login'])
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioLogeado');

    this.mostrarAlerta("Se cerro sesion exitosamente")
    this.router.navigate(['/home'])
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      // header: 'No se ha podido procesar tu solicitud',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }


}

