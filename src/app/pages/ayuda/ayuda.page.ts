import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  tipoConsulta: string | null = null;
  texto: string = '';

  //Mensaje de alerta
  msjConsulta: string = '';
  msjTexto: string = '';

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  validarConsulta() {
    if (!this.tipoConsulta) {
      this.msjConsulta = 'Debe ingresar una opcion';
    }
    else {
      this.msjConsulta = '';
      console.log('Tipo de consulta:', this.tipoConsulta);
    }
  }

  validarTexto() {
    if (this.texto === '') {
      this.msjTexto = 'Por favor ingresa tus comentarios';
    }
    else if (this.texto.length == 250) {
      this.msjTexto = 'Supero el maximo de caracteres';
    }
    else {
      this.msjTexto = '';
    }
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Solicitud envida!',
      message: 'Tus comentarios fueron enviados correctamente',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  continuar() {
    //Validaciones

    this.validarConsulta();
    this.validarTexto();

    if (this.msjConsulta !== '' || this.msjTexto !== '') {
      return;
    }

    this.mostrarAlerta();
    this.router.navigate(['/home']);

  }

}
