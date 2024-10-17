import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciobdService } from 'src/app/services/serviciobd.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-foro-detalle',
  templateUrl: './foro-detalle.page.html',
  styleUrls: ['./foro-detalle.page.scss'],
})
export class ForoDetallePage implements OnInit {

  foro: any = [];
  arregloComentario: any = [];
  comentario: string = '';

  usuario: string = "";
  id !: number;
  usuariologeado: boolean = false;
  admin: boolean = false;

  msjValidacion: string = "";



  constructor(private activedrouter: ActivatedRoute, private db: ServiciobdService, private router: Router, private storage: StorageService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.foro = this.router.getCurrentNavigation()?.extras?.state?.['foro'];
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
        this.db.fetchComentarioForo().subscribe(res => {
          this.arregloComentario = res;
        })

        this.db.estadoUsuario().subscribe(res => {
          this.usuariologeado = res;
        })

        this.db.getRolUsuario().subscribe(rol => {
          if (rol !== null) {
            this.admin = rol == 1;
          } else {
            this.admin = false;
          }
        })

        this.db.mostrarComentarioForo(this.foro.id_foro);

      }
    })
  }

  comentarForo() {
    if (this.comentario === "") {
      this.msjValidacion = 'Debe ingresar un comentario';
    } else if (!this.usuariologeado) {
      this.msjValidacion = 'Debe inciar sesion para comentar';
    } else {
      this.msjValidacion = "";
      this.db.agregarComentario(this.comentario, this.id, this.foro.id_foro, null);
    }
  }

  eliminarComentario(x: any) {
    this.db.eliminarComentario(x.id_comentario);
  }


}