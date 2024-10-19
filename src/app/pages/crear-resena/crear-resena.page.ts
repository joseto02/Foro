import { Component, OnInit } from '@angular/core';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-resena',
  templateUrl: './crear-resena.page.html',
  styleUrls: ['./crear-resena.page.scss'],
})
export class CrearResenaPage implements OnInit {

  titulo: string = "";
  titular: string = "";
  texto: string = "";
  foto: any;

  msjTitulo: string = "";
  msjTitular: string = "";
  msjTexto: string = "";
  msjFoto: string = "";


  constructor(private bd: ServiciobdService, private router: Router) { }

  ngOnInit() {
  }

  validarTitulo() {
    if (this.titulo === '') {
      this.msjTitulo = 'Debe ingresar un titulo'
    } else {
      this.msjTitulo = '';
    }
  }

  validarTitular() {
    if (this.titular === '') {
      this.msjTitular = 'El titular es obligatorio';
    } else {
      this.msjTitular = '';
    }
  }

  validarTexto() {
    if (this.texto === '') {
      this.msjTexto = 'El contenido de la reseña es obligatorio';
    } else {
      this.msjTexto = '';
    }
  }

  validarFoto() {
    if (!this.foto) {
      this.msjFoto = 'Debe ingresar una foto';
    } else {
      this.msjFoto = '';
    }
  }

  insertar() {
    this.validarTitulo();
    this.validarTitular();
    this.validarTexto();
    this.validarFoto();

    if (this.msjTitular !== '' || this.msjTitulo !== '' || this.msjTexto !== '' || this.msjFoto !== '') {
      return;
    }

    this.bd.agregarResena(this.titulo, this.titular, this.texto, this.foto);
    this.router.navigate(['/crear-contenido'])
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    this.foto = image.webPath;

  };


}
