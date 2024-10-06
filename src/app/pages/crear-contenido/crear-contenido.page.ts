import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServiciobdService } from 'src/app/services/serviciobd.service';

@Component({
  selector: 'app-crear-contenido',
  templateUrl: './crear-contenido.page.html',
  styleUrls: ['./crear-contenido.page.scss'],
})
export class CrearContenidoPage implements OnInit {

  arregloContenido: any = [{
    id_contenido: '',
    titulo: '',
    texto: '',
    foto: '',
    id_tema: ''
  }]

  constructor(private bd: ServiciobdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      //validar si la bd esta lista
      if (data) {
        //suscribir al observable de la listaContenido
        this.bd.fetchContenido().subscribe(res => {
          this.arregloContenido = res;
        })
      }
    })
  }

  modificar(x: any) {
    let navigationsExtras: NavigationExtras = {
      state: {
        contenido: x
      }
    }
    this.router.navigate(['/editar-contenido'], navigationsExtras);
  }

  eliminar(x: any) {
    this.bd.eliminarContenido(x.id_contenido);
  }

  agregar() {
    this.router.navigate(['/insertar']);
  }

}
