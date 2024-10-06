import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciobdService } from 'src/app/services/serviciobd.service';

@Component({
  selector: 'app-editar-contenido',
  templateUrl: './editar-contenido.page.html',
  styleUrls: ['./editar-contenido.page.scss'],
})
export class EditarContenidoPage implements OnInit {

  contenido: any;

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServiciobdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.contenido = this.router.getCurrentNavigation()?.extras?.state?.['contenido'];
      }
    })
  }

  ngOnInit() {
  }

  modificar() {
    this.bd.modificarContenido(this.contenido.id_contenido, this.contenido.titulo, this.contenido.texto);
  }

}