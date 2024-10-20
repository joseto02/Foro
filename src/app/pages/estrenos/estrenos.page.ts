import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ServicioapiService } from 'src/app/services/servicioapi.service';

@Component({
  selector: 'app-estrenos',
  templateUrl: './estrenos.page.html',
  styleUrls: ['./estrenos.page.scss'],
})
export class EstrenosPage implements OnInit {

  juegos: any = [];
  nextPage: string | null = null;

  constructor(private api: ServicioapiService, private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.cargarJuegos();
  }

  cargarJuegos() {
    this.api.getGames().subscribe(res => {
      this.juegos = res.results;
      this.nextPage = res.next;
    })
  }

  paginaSiguiente() {
    if (this.nextPage) {
      this.api.getNextPage(this.nextPage).subscribe(res => {
        this.juegos = [...this.juegos, ...res.results];
        this.nextPage = res.next;
      })
    }
  }

  compartir(juego: any) {

    const titulo = juego.name;
    const slug = juego.slug;
    const url = `https://rawg.io/games/${slug}`;

    this.socialSharing.share(titulo, '', '', url);
    
  }


}
