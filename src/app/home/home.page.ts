import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ServiciobdService } from '../services/serviciobd.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  nombre: string = '';
  estadoUsuario: boolean = false;

  constructor(private storage: StorageService, private db: ServiciobdService) {}


  async ngOnInit() {
    
    this.storage.getNickName().subscribe(res => {
      this.nombre = res || '';
    });

    this.db.dbState().subscribe(data => {
      if (data) {
        this.db.estadoUsuario().subscribe(res => {
          this.estadoUsuario = res;
        })

      }
    })

    if (!this.estadoUsuario) {
      await this.storage.borrarStorage();
    }
    
  }





}
