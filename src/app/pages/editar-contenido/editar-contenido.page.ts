import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-editar-contenido',
  templateUrl: './editar-contenido.page.html',
  styleUrls: ['./editar-contenido.page.scss'],
})
export class EditarContenidoPage implements OnInit {

  contenido: any;

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServiciobdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.contenido = this.router.getCurrentNavigation()?.extras?.state?.['contenido'];
      }
    })
  }

  ngOnInit() {
  }

  modificar() {
    this.bd.modificarContenido(this.contenido.id_contenido, this.contenido.titulo, this.contenido.titular, this.contenido.texto, this.contenido.foto);
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
    this.contenido.foto = image.webPath;

  };

}