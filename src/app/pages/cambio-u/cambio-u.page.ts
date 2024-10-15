import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cambio-u',
  templateUrl: './cambio-u.page.html',
  styleUrls: ['./cambio-u.page.scss'],
})
export class CambioUPage implements OnInit {

  correoActual: string = '';
  correoIngresado: string = '';
  newCorreo: string = '';
  newCorreo2: string = '';

  //Variables para los mensajes
  msjCorreoActual: string = '';
  msjNewCorreo: string = '';
  msjvalidacion: string = '';

  usuario: string = "";
  id: string = "";
  arregloPerfil: any = [];
  
  constructor(
    private toastController: ToastController,
    private db: ServiciobdService,
    private router: Router,
    private storage: StorageService,
  ) { }

  async ngOnInit() {
    
    this.storage.getNickName().subscribe(res => {
      this.usuario = res || '';
    })

    this.id = await this.db.obtenerIdUsuario(this.usuario);

    //correo actual
    this.correoActual = await this.db.obtenerCorreo(this.usuario);

    this.db.dbState().subscribe(data => {
      if (data) {
        this.db.fetchPerfil().subscribe(res => {
          this.arregloPerfil = res;
        })
        this.db.seleccionarPerfil(this.id);
      }

    })

  }

  validarCorreo() {
    const correoValido = /@/;

    if (this.correoIngresado === '') {
      this.msjCorreoActual = 'Debe ingresar su correo actual';
    }
    else if (!correoValido.test(this.correoIngresado)) {
      this.msjCorreoActual = 'Debe ingresar un correo valido';
    }
    else if (this.correoIngresado !== this.correoActual) {
      this.msjCorreoActual = 'Su correo actual no coincide';
    }
    else {
      this.msjCorreoActual = '';
    }
  }

  validarNewCorreo() {
    const correoValido = /@/;

    if (this.newCorreo === '') {
      this.msjNewCorreo = 'Debe ingresar un nuevo correo';
    }
    else if (this.newCorreo == this.correoActual) {
      this.msjNewCorreo = 'El nuevo correo no puede ser igual al actual'
    }
    else if (!correoValido.test(this.newCorreo)) {
      this.msjNewCorreo = 'Debe ingresar un correo valido';
    }
    else {
      this.msjNewCorreo = '';
    }
  }

  validarCorreos() {
    if (this.newCorreo !== this.newCorreo2) {
      this.msjvalidacion = 'Los correos no coiciden';
    }
    else {
      this.msjvalidacion = '';
    }
  }
  
  continuar() {

    this.validarCorreo();
    this.validarNewCorreo();
    this.validarCorreos();

    if (this.msjCorreoActual !== '' || this.msjNewCorreo !== '' || this.msjvalidacion !== '') {
      return;
    }

    this.db.cambioCorreo(this.id, this.newCorreo);
    this.db.seleccionarPerfil(this.id);
    this.router.navigate(['/configuracion']);
    this.presentToast('bottom');
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
