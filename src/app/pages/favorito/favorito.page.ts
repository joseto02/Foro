import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.page.html',
  styleUrls: ['./favorito.page.scss'],
})
export class FavoritoPage implements OnInit {

  favorito: any = [];
  usuario: string = "";
  id_usu!: number;

  resena: any = [];
  noticia: any = [];

  constructor(private db: ServiciobdService, private storage: StorageService) { 
  }

  async ngOnInit() {

    this.storage.getNickName().subscribe(res => {
      this.usuario = res || '';
    })

    this.id_usu = await this.db.obtenerIdUsuario(this.usuario);

    this.db.dbState().subscribe(data => {
      if (data) {
        this.db.fetchFavorito().subscribe(res => {
          this.favorito = res;
        })
      }

      this.db.mostrarFavoritos(this.id_usu);
    })
  }

  borrar(x:any) {
    this.db.borrarFavorito(x.id_favorito, this.id_usu);
  }


}
