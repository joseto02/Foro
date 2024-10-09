import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciobdService } from './services/serviciobd.service';
import { StorageService } from './services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  usuarioLogeado: boolean = false;
  esAdmin: boolean = false;

  constructor(private router: Router, private storage: StorageService, private db: ServiciobdService) {
    
    this.db.dbState().subscribe(data => {
      if (data) {
        this.db.estadoUsuario().subscribe(res => {
          this.usuarioLogeado = res;
        });

        this.db.getRolUsuario().subscribe(rol => {
          if (rol !== null) {
            this.esAdmin = rol == 1;
          } else {
            this.esAdmin = false;
          }
        });
      }
    })
  }
  

  async cerrarSesion() {

    await this.db.cerrarSesion();
    await this.storage.borrarStorage(); 
    await this.router.navigate(['/home'])
  }



}

