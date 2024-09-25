import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-olvpas',
  templateUrl: './olvpas.page.html',
  styleUrls: ['./olvpas.page.scss'],
})
export class OlvpasPage implements OnInit {

  email: string = '';

  //mensajes de validacion
  msjEmail: string = '';

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  validarEmail() {
    const emailValido = /@/;

    if (this.email === '') {
      this.msjEmail = 'Debe ingresar su email asociado a GamerNest';
    }
    else if (!emailValido.test(this.email)) {
      this.msjEmail = 'Debe ingresar un email valido';
    }
    else {
      this.msjEmail = '';
    }
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Se le envio un email a su correo',
      message: 'Siga las instrucciones del correo para recuperar su contraseña',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  continuar() {
    
    this.validarEmail();

    if (this.msjEmail !== '') {
      return;
    }

    this.mostrarAlerta();
    this.router.navigate(['/home']);
  }


}
