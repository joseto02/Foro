import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciobdService } from 'src/app/services/serviciobd.service';

@Component({
  selector: 'app-foros',
  templateUrl: './foros.page.html',
  styleUrls: ['./foros.page.scss'],
})
export class ForosPage implements OnInit {

  arregloForo: any = [];
  msjError: string = '';

  usuarioLogueado: boolean = false;

  constructor(private db: ServiciobdService, private router:Router) { }

  ngOnInit() {
    this.db.dbState().subscribe(data => {
      if (data) {
        this.db.fetchForo().subscribe(res => {
          this.arregloForo = res;
        })

        this.db.estadoUsuario().subscribe(res => {
          this.usuarioLogueado = res;
        })
      }
    })
  }

  validarBoton() {
    if (!this.usuarioLogueado) {
      this.msjError = 'Debe iniciar sesion';
    }
    else {
      this.msjError = '';
    }
  }

  agregarTema() {

    this.validarBoton();

    if (this.msjError !== '') {
      return;
    }

    this.router.navigate(['/foro-agregar']);
  }


}
