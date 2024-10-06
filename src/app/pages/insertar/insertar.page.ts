import { Component, OnInit } from '@angular/core';
import { ServiciobdService } from 'src/app/services/serviciobd.service';

@Component({
  selector: 'app-insertar',
  templateUrl: './insertar.page.html',
  styleUrls: ['./insertar.page.scss'],
})
export class InsertarPage implements OnInit {

  titulo: string = "";
  texto: string = "";
  id_tema !: number;

  constructor(private bd: ServiciobdService) { }

  ngOnInit() {
  }

  insertar() {
    this.bd.agregarContenido(this.titulo, this.texto, this.id_tema);
  }

}
