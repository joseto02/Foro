import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  noticias: any = [];
  user: string = "";
  id_user!: number;

  userLogged: boolean = false;
  
  constructor(private db: ServiciobdService, private actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing, private router: Router, private storage: StorageService) { }

  async ngOnInit() {

    this.storage.getNickName().subscribe(res => {
      this.user = res || '';
    })

    this.id_user = await this.db.obtenerIdUsuario(this.user);

    this.db.dbState().subscribe(data => {
      if (data) {
        this.db.fetchNoticia().subscribe(res => {
          this.noticias = res;
        })

        this.db.estadoUsuario().subscribe(res => {
          this.userLogged = res;
        })
      }
    })
  }

  irNoticia(x: any) {
    let navigationsExtras: NavigationExtras = {
      state: {
        noticia: x
      }
    }
    this.router.navigate(['/noticia-detalle'], navigationsExtras);
  }

  async opciones(x: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => this.compartirContenido(x)
        },
        {
          text: 'Favorito',
          icon: 'heart-outline',
          handler: () => this.favoritos(x)
        }
      ]
    });

    await actionSheet.present();

  }

  compartirContenido(noticia: any) {
    const mensaje = `${noticia.titulo}\n\n${noticia.titular}\n\n${noticia.foto}`;
    const imagen = noticia.foto;

    this.socialSharing.share(mensaje, imagen)
      .then(() => {
        console.log('Compartido en WhatsApp con éxito');
      })
      .catch((error) => {
        console.error('Error al compartir en WhatsApp:', error);
        this.db.presentAlert('Error', 'WhatsApp no está disponible en este dispositivo.');
      });
  }

  favoritos(x: any) {
    if (!this.userLogged) {
      this.db.presentAlert("Accion denegada", "Debe iniciar sesión para agregar a favoritos")
    } else {
      this.db.agregarFavorito(this.id_user, x.id_contenido);
    }
  }

}
