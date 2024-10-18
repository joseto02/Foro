import { Component, OnInit } from '@angular/core';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-insertar',
  templateUrl: './insertar.page.html',
  styleUrls: ['./insertar.page.scss'],
})
export class InsertarPage implements OnInit {

  titulo: string = "";
  titular: string = "";
  texto: string = "";
  foto: any;
  

  constructor(private bd: ServiciobdService) { }

  ngOnInit() {
  }

  insertar() {
      this.bd.agregarNoticia(this.titulo, this.titular, this.texto, this.foto);
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.foto = image.webPath;

  };

}
