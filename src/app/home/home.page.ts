import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuarioLogeado: string = '';

  constructor(private router:Router) {}

  irPagina() {
    this.router.navigate(['/login'])
  }

  ngOnInit() {
    this.usuarioLogeado = localStorage.getItem('usuarioLogeado') || '';
  }
}
