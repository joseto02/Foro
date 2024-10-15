import { Component, OnInit } from '@angular/core';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { StorageService } from 'src/app/services/storage.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  
  usuario: string = "";
  id_perfil: string = "";
  arregloPerfil: any = [];
  foto: any;

  constructor(private storage: StorageService, private db: ServiciobdService) { }

  async ngOnInit() {

    //obetenemos el nombre de usuario por local storage
    this.storage.getNickName().subscribe(res => {
      this.usuario = res || '';
    });

    //metodo para obtener el id del usario
    this.id_perfil = await this.db.obtenerIdUsuario(this.usuario);

    this.db.dbState().subscribe(data => {
      if (data) {

        this.db.fetchPerfil().subscribe(res => {
          this.arregloPerfil = res;
        })

        this.db.seleccionarPerfil(this.id_perfil);

      }

    })
  }


  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });


    this.foto = image.webPath;

    //le pasamos la foto y el id de usuario al metodo
    this.db.guardarFotoPerfil(this.foto, this.id_perfil);

    //aqui se actualiza la foto en tiempo real
    this.db.seleccionarPerfil(this.id_perfil);

  };



}
