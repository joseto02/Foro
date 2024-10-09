import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { BehaviorSubject } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //Variables
  private nombreUsuario = new BehaviorSubject<string | null>(null);
  

  constructor(private storage: NativeStorage) { 
    this.getStorage();
  }

  getNickName() {
    return this.nombreUsuario.asObservable();
  }

  

  async setStorage(nombre: string) {
    await this.storage.setItem('nombreUsuario', nombre);
    this.nombreUsuario.next(nombre);
    
  }

  async getStorage() {
    const nombre = await this.storage.getItem('nombreUsuario').catch(() => null);
    this.nombreUsuario.next(nombre);
  }

  async borrarStorage() {
    await this.storage.remove('nombreUsuario');
    this.nombreUsuario.next(null);
  }

}
