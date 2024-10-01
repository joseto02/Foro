import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from '../model/rol';
import { Tema } from '../model/tema';

@Injectable({
  providedIn: 'root'
})
export class ServiciobdService {

  //Nombre variable para la conexion a la base de datos
  public conexionBase !: SQLiteObject;

  //Variables para crear la base de datos
  
  //Tablas sin claves foraneas
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombreRol VARCHAR(10) NOT NULL);";
  tablaTema: string = "CREATE TABLE IF NOT EXISTS tema(id_tema INTEGER PRIMARY KEY AUTOINCREMENT, nombreTema VARCHAR(10) NOT NULL);";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nickName VARCHAR(35) NOT NULL, clave VARCHAR(50) NOT NULL, correo VARCHAR(50) NOT NULL, foto VARCHAR(100), id_rol INTEGER, FOREIGN KEY (id_rol) REFERENCES rol(id_rol));";
  tablaContenido: string = "CREATE TABLE IF NOT EXISTS contenido(id_contenido INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(40) NOT NULL, texto TEXT NOT NULL, id_tema INTEGER, FOREIGN KEY(id_tema) REFERENCES tema(id_tema));";
  tablaComentario: string = "CREATE TABLE IF NOT EXISTS comentario(id_comentario INTEGER PRIMARY KEY AUTOINCREMENT, fecha_comentario VARCHAR(10), texto TEXT NOT NULL, id_usuario INTEGER, FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario), id_contenido INTEGER, FOREIGN KEY(id_contenido) REFERENCES contenido(id_contenido));";
  tablaFavoritos: string = "CREATE TABLE IF NOT EXISTS favorito(id_favorito INTEGER PRIMARY KEY AUTOINCREMENT, fecha_agregado VARCHAR(10), id_usuario INTEGER, FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario), id_contenido INTEGER, FOREIGN KEY(id_contenido) REFERENCES contenido(id_contenido));";

  //Variables para los insert por defecto en nuestras tablas

  //Tabla rol
  registroRol: string = "INSERT OF IGNORE INTO rol(id_rol, nombreRol) VALUES(1, 'admin');";
  // registroRol2: string = "INSERT OF IGNORE INTO rol(id_rol, nombreRol) VALUES(2, 'usuario');";

  //Tabla Tema
  registroTema: string = "INSERT OF IGNORE INTO tema(id_tema, nombreTema) VALUES(1, 'noticia')";

  //Variable para guardar los datos de las consulas en las tablas
  listadoRol = new BehaviorSubject([]);
  listadoTema = new BehaviorSubject([]);

  //Variable para el status de la base de datos
  private isBDReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { 

  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //Metodos para manipular los observables
  fetchRol(): Observable<Rol[]>{
    return this.listadoRol.asObservable();
  }

  fetchTema(): Observable<Tema[]>{
    return this.listadoTema.asObservable();
  }

  dbState() {
    return this.isBDReady.asObservable();
  }

  //Funcion para crear la base de datos
  createBD() {
    //Verificar si la plataforma esta disponible
    this.platform.ready().then(() => {
      //Crear la base de datos
      this.sqlite.create({
        name: 'foro.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //capturar la conexion a la BD
        this.conexionBase = db;
        //llamamos a la funcion para crear tablas
        this.crearTablas();
      }).catch(e => {
        this.presentAlert('Base de datos', 'Error en crear la BD: ' + JSON.stringify(e));
      })

    })
  }

  async crearTablas() {
    try {
      //ejecuto la creacion de tablas
      await this.conexionBase.executeSql(this.tablaRol, []);
      await this.conexionBase.executeSql(this.tablaTema, []);

      //Ejecuto los insert por defecto en caso que existan
      await this.conexionBase.executeSql(this.registroRol, []);
      await this.conexionBase.executeSql(this.registroTema, []);

      //modifico el estado de la base de datos
      this.isBDReady.next(true);

    } catch(e) {
      this.presentAlert('Creacion de tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

}
