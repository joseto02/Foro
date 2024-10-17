import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServiciobdService } from 'src/app/services/serviciobd.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.scss'],
})
export class ForoPage implements OnInit {

  arregloForo: any = [];
  msjError: string = '';

  usuarioLogueado: boolean = false;

  constructor(private db: ServiciobdService, private router: Router) { }

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

  agregarTema() {
    if (!this.usuarioLogueado) {
      this.msjError = 'Debe iniciar sesión para agregar un tema';
    } else {
      this.msjError = '';
      this.router.navigate(['/foro-agregar']);
    }
  }

  irForo(x:any) {
    let navigationsExtras: NavigationExtras = {
      state: {
        foro: x
      }
    }
    this.router.navigate(['/foro-detalle'], navigationsExtras);
  }


  
}
