import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  noticias: any = [];
  
  constructor(private db: ServiciobdService, private actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing, private router: Router) { }

  ngOnInit() {
    this.db.dbState().subscribe(data => {
      if (data) {
        this.db.fetchNoticia().subscribe(res => {
          this.noticias = res;
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
          handler: () => this.onShareNoticias()
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

  onShareNoticias() {
    
  }


}
