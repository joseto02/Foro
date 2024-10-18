import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-noticia-detalle',
  templateUrl: './noticia-detalle.page.html',
  styleUrls: ['./noticia-detalle.page.scss'],
})
export class NoticiaDetallePage implements OnInit {

  noticia: any = [];
  
  usuario: string = "";
  id !: number;
  arregloComentario: any = [];
  usuarioLogeado: boolean = false;
  admin: boolean = false;

  comentario: string = "";
  msjValidacion: string = "";

  constructor(
    private activedrouter: ActivatedRoute,
    private db: ServiciobdService,
    private router: Router,
    private storage: StorageService
  ) { 
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.noticia = this.router.getCurrentNavigation()?.extras?.state?.['noticia'];
      }
    })
  }

  async ngOnInit() {

    this.storage.getNickName().subscribe(res => {
      this.usuario = res || '';
    })

    this.id = await this.db.obtenerIdUsuario(this.usuario);

    this.db.dbState().subscribe(data => {
      if (data) {
        this.db.fetchComentarioContenido().subscribe(res => {
          this.arregloComentario = res;
        })

        this.db.estadoUsuario().subscribe(res => {
          this.usuarioLogeado = res;
        })

        this.db.getRolUsuario().subscribe(rol => {
          if (rol !== null) {
            this.admin = rol == 1;
          } else {
            this.admin = false;
          }
        })

        this.db.mostrarComentarioContenido(this.noticia.id_contenido);

      }
    })

  }

  comentarNoticia() {
    if (this.comentario === "") {
      this.msjValidacion = 'Debe ingresar un comentario';
    } else if (!this.usuarioLogeado) {
      this.msjValidacion = 'Debe iniciar sesión para comentar'
    } else {
      this.msjValidacion = '';
      this.db.agregarComentario(this.comentario, this.id, null, this.noticia.id_contenido);
    }
  }

  eliminarComentarioNoticia(x: any) {
    this.db.eliminarComentarioContenido(x.id_comentario, this.noticia.id_contenido);
  }



}
