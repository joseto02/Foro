import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciobdService } from 'src/app/services/serviciobd.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  selectTabs = "activos";

  arregloUsuario: any = [{
    id_usuario: '',
    nickName: '',
    clave: '',
    coreo: '',
    foto: '',
    estado: '',
    id_rol:''
  }]

  arregloUsuarioSuspendidos: any = [{
    id_usuario: '',
    nickName: '',
    clave: '',
    coreo: '',
    foto: '',
    estado: '',
    id_rol: ''
  }]

  constructor(private bd: ServiciobdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        // Obtener usuarios activos
        this.bd.fetchUsuario().subscribe(res => {
          this.arregloUsuario = res;
        });

        // Obtener usuarios suspendidos
        this.bd.seleccionarUsuarioSuspendidos().then(res => {
          this.arregloUsuarioSuspendidos = res;
        });
      }
    });
  }

  suspender(x:any) {
    this.bd.suspenderUsuario(x.id_usuario);
  }

  activar(x: any) {
    this.bd.activarUsuario(x.id_usuario);
  }

  eliminar(x: any) {
    this.bd.borrarUsuario(x.id_usuario);
  }

}
