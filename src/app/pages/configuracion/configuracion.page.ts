import { Component, OnInit } from '@angular/core';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { StorageService } from 'src/app/services/storage.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  
  usuario: string = "";
  correo: string = "";

  foto: any;

  constructor(private storage: StorageService, private db: ServiciobdService) { }

  async ngOnInit() {

    this.storage.getNickName().subscribe(res => {
      this.usuario = res || '';
    });

    this.correo = await this.db.getCorreoUsuario(this.usuario);
    
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
