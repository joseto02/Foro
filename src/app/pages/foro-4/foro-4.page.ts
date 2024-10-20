import { Component, OnInit } from '@angular/core';
import { ServicioapiService } from 'src/app/services/servicioapi.service';

@Component({
  selector: 'app-foro-4',
  templateUrl: './foro-4.page.html',
  styleUrls: ['./foro-4.page.scss'],
})
export class Foro4Page implements OnInit {

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
