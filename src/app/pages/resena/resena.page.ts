import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { ServiciobdService } from 'src/app/services/serviciobd.service';

@Component({
  selector: 'app-resena',
  templateUrl: './resena.page.html',
  styleUrls: ['./resena.page.scss'],
})
export class ResenaPage implements OnInit {

  resenas: any = "";

  constructor(private db: ServiciobdService, private router: Router, private actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.db.dbState().subscribe(data => {
      if (data) {
        this.db.fetchResena().subscribe(res => {
          this.resenas = res;
        })
      }
    })
  }

  irResena(x: any) {
    let navigationsExtras: NavigationExtras = {
      state: {
        resena: x
      }
    }
    this.router.navigate(['/resena-detalle'], navigationsExtras);
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
