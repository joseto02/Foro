import { Component, OnInit } from '@angular/core';
import { ServicioapiService } from 'src/app/services/servicioapi.service';

@Component({
  selector: 'app-estrenos',
  templateUrl: './estrenos.page.html',
  styleUrls: ['./estrenos.page.scss'],
})
export class EstrenosPage implements OnInit {

  juegos: any = [];
  nextPage: string | null = null;

  constructor(private api: ServicioapiService) { }

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

}
