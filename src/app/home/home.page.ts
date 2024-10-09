import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  nombre: string = '';

  constructor(private storage: StorageService) {}


  async ngOnInit() {
    
    this.storage.getNickName().subscribe(res => {
      this.nombre = res || '';
    });
    
  }

}
