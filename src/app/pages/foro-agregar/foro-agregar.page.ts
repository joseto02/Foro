import { Component, OnInit } from '@angular/core';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-foro-agregar',
  templateUrl: './foro-agregar.page.html',
  styleUrls: ['./foro-agregar.page.scss'],
})
export class ForoAgregarPage implements OnInit {
  id: string = "";
  usuario: string = "";


  titulo: string = "";
  texto: string = "";

  msjTitulo: string = "";
  msjTexto: string = "";


  constructor(private db:ServiciobdService, private storage:StorageService) { }

  async ngOnInit() {
    this.storage.getNickName().subscribe(res => {
      this.usuario = res || '';
    })

    this.id = await this.db.obtenerIdUsuario(this.usuario)

  }

  validarTitulo() {
    if (this.titulo === '') {
      this.msjTitulo = 'Debe ingresar un titulo'
    } else {
      this.msjTitulo = '';
    }
  }

  validarTexto() {
    if (this.texto === '') {
      this.msjTexto = 'El contenido del foro es obligatorio';
    } else {
      this.msjTexto = '';
    }
  }

  insertar() {
    this.validarTitulo();
    this.validarTexto();

    if (this.msjTitulo !== '' || this.msjTexto !== '') {
      return;
    }

    this.db.agregarForo(this.titulo, this.texto, this.id);
  }

}
