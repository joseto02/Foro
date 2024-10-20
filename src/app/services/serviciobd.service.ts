import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from '../model/rol';
import { Tema } from '../model/tema';
import { Contenido } from '../model/contenido';
import { Usuario } from '../model/usuario';
import { Foro } from '../model/foro';
import { Comentario } from '../model/comentario';
import { Favorito } from '../model/favorito';

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

  //tablas con claves foraneas
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nickName VARCHAR(35) NOT NULL, clave VARCHAR(50) NOT NULL, correo VARCHAR(100) NOT NULL, foto VARCHAR(100), estado INTEGER DEFAULT 1, id_rol INTEGER, FOREIGN KEY (id_rol) REFERENCES rol(id_rol));";
  tablaContenido: string = "CREATE TABLE IF NOT EXISTS contenido(id_contenido INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(40) NOT NULL, titular VARCHAR(100), texto TEXT NOT NULL, foto VARCHAR(100), id_tema INTEGER, FOREIGN KEY(id_tema) REFERENCES tema(id_tema));";
  tablaForo: string = "CREATE TABLE IF NOT EXISTS foro(id_foro INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(100), autor VARCHAR(50), texto TEXT, id_usuario INTEGER, FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE)";
  tablaComentario: string = `
  CREATE TABLE IF NOT EXISTS comentario (
    id_comentario INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha_comentario DATE NOT NULL,
    texto TEXT NOT NULL,
    id_usuario INTEGER NOT NULL,
    id_contenido INTEGER,
    id_foro INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_contenido) REFERENCES contenido(id_contenido) ON DELETE CASCADE,
    FOREIGN KEY (id_foro) REFERENCES foro(id_foro) ON DELETE CASCADE
  );
`;
  
  tablaFavoritos: string = `
  CREATE TABLE IF NOT EXISTS favorito(
    id_favorito INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha_agregado DATE,
    id_usuario INTEGER,
    id_contenido INTEGER,
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY(id_contenido) REFERENCES contenido(id_contenido) ON DELETE CASCADE
  );
`;

  // -----Variables para los insert por defecto en nuestras tablas--------

  //Tabla rol
  registroRol: string = "INSERT OR IGNORE INTO rol(id_rol, nombreRol) VALUES(1, 'admin');";
  registroRol2: string = "INSERT OR IGNORE INTO rol(id_rol, nombreRol) VALUES(2, 'usuario');";

  //Tabla Tema
  registroTema: string = "INSERT OR IGNORE INTO tema(id_tema, nombreTema) VALUES(1, 'noticia');";
  registroTema2: string = "INSERT OR IGNORE INTO tema(id_tema, nombreTema) VALUES(2, 'reseña');";

  //tabla contenido
  registroContenido: string = "INSERT OR IGNORE INTO contenido(id_contenido, titulo, titular, texto, foto, id_tema) VALUES (1, 'Contenido agregado desde la BBDD', 'TITULAR', 'Imagen agregada desde la BBDD', '/assets/portadas/space marine.jpg', 1);";
  
  //Tabla usuario
  registroUsuario: string = "INSERT OR IGNORE INTO usuario(id_usuario, nickName, clave, correo, id_rol) VALUES(1, 'admin', 'Duoc2024@', 'jom.gonzalez@duocuc.cl', 1);";

  registroComentario: string = "INSERT OR IGNORE INTO comentario(id_comentario, fecha_comentario, texto, id_usuario, id_foro) VALUES(1, DATE('now'), 'Comentario de foro', 1, 1)";

  borrarContenido: string = "DROP TABLE contenido";

  //Variable para guardar los datos de las consultas en las tablas

  listadoNoticia = new BehaviorSubject([]);
  listadoResena = new BehaviorSubject([]);

  listadoUsuario = new BehaviorSubject([]);
  listadoUsuarioBan = new BehaviorSubject([]);
  listaPerfil = new BehaviorSubject([]);

  listaForo = new BehaviorSubject([]);

  listaComentarioForo = new BehaviorSubject([]);
  listaComentarioContenido = new BehaviorSubject([]);

  listaFavorito = new BehaviorSubject([]);

  //Variable para el status de la base de datos
  private isBDReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { 
    this.createBD();
  }

  //Metodos para manipular los observables

  fetchNoticia(): Observable<Contenido[]>{
    return this.listadoNoticia.asObservable();
  }

  fetchResena(): Observable<Contenido[]>{
    return this.listadoResena.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]>{
    return this.listadoUsuario.asObservable();
  }

  fetchUsuarioBloqueado(): Observable<Usuario[]>{
    return this.listadoUsuarioBan.asObservable();
  }

  fetchPerfil(): Observable<Usuario[]>{
    return this.listaPerfil.asObservable();
  }

  fetchForo(): Observable<Foro[]>{
    return this.listaForo.asObservable();
  }

  fetchComentarioForo(): Observable<Comentario[]>{
    return this.listaComentarioForo.asObservable();
  }

  fetchComentarioContenido(): Observable<Comentario[]>{
    return this.listaComentarioContenido.asObservable();
  }

  fetchFavorito(): Observable<Favorito[]>{
    return this.listaFavorito.asObservable();
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
      await this.conexionBase.executeSql(this.tablaContenido, []);
      await this.conexionBase.executeSql(this.tablaUsuario, []);
      await this.conexionBase.executeSql(this.tablaForo, []);
      await this.conexionBase.executeSql(this.tablaComentario, []);
      await this.conexionBase.executeSql(this.tablaFavoritos, []);

      //Ejecuto los insert por defecto en caso que existan
      await this.conexionBase.executeSql(this.registroRol, []);
      await this.conexionBase.executeSql(this.registroRol2, []);
      await this.conexionBase.executeSql(this.registroTema, []);
      await this.conexionBase.executeSql(this.registroTema2, []);
      await this.conexionBase.executeSql(this.registroContenido, []);
      await this.conexionBase.executeSql(this.registroUsuario, []);
      

      this.mostrarNoticia();
      this.mostrarResena();
      this.seleccionarUsuario();
      this.seleccionarUsuarioSuspendidos();
      this.mostrarForo();
      this.homeNoticias();
      this.homeForo();
      this.homeResena();

      //modifico el estado de la base de datos
      this.isBDReady.next(true);

    } catch(e) {
      this.presentAlert('Creacion de tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

  //METODOS PARA EL ADMINISTRADOR

  //Gestion de contenidos (NOTICIAS Y RESEÑAS)

  mostrarNoticia() {
    return this.conexionBase.executeSql('SELECT * FROM contenido WHERE id_tema = 1', []).then(res => {
      //variable para almacenar el resultado de la consulta
      let items: Contenido[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los registros a mi lista
          items.push({
            id_contenido: res.rows.item(i).id_contenido,
            titulo: res.rows.item(i).titulo,
            titular: res.rows.item(i).titular,
            texto: res.rows.item(i).texto,
            foto: res.rows.item(i).foto,
            id_tema: res.rows.item(i).id_tema
          })
        }

      }
      //actualizar el observable
      this.listadoNoticia.next(items as any);

    })
  }

  mostrarResena() {
    return this.conexionBase.executeSql('SELECT * FROM contenido WHERE id_tema = 2', []).then(res => {
      //variable para almacenar el resultado de la consulta
      let items: Contenido[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los registros a mi lista
          items.push({
            id_contenido: res.rows.item(i).id_contenido,
            titulo: res.rows.item(i).titulo,
            titular: res.rows.item(i).titular,
            texto: res.rows.item(i).texto,
            foto: res.rows.item(i).foto,
            id_tema: res.rows.item(i).id_tema
          })
        }

      }
      //actualizar el observable
      this.listadoResena.next(items as any);

    })
  }


  eliminarContenido(id: string) {
    this.alertaConfirmacion("¿Esta seguro que desea eliminar este contenido?", () => {
      return this.conexionBase.executeSql('DELETE FROM contenido WHERE id_contenido = ?', [id]).then(res => {
        this.presentAlert("Eliminar", "Contenido eliminado");
        this.mostrarNoticia();
        this.mostrarResena();
      }).catch(e => {
        this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
      })
    })
  }

  modificarContenido(id:string, titulo:string, titular:string, texto:string, foto: string) {
    return this.conexionBase.executeSql('UPDATE contenido SET titulo = ?, titular = ?, texto = ?, foto = ? WHERE id_contenido = ?', [titulo, titular, texto, foto, id]).then(res => {
      this.presentAlert("Modificar", "Contenido Modificado");
      this.mostrarNoticia();
      this.mostrarResena();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }

  agregarNoticia(titulo:string, titular:string, texto: string, foto:any) {
    return this.conexionBase.executeSql('INSERT INTO contenido(titulo, titular, texto, foto, id_tema) VALUES (?,?,?,?,1)', [titulo, titular, texto, foto]).then(res => {
      this.presentAlert("Noticia", "Noticia agregada exitosamente");
      this.mostrarNoticia();
      this.mostrarResena();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

  agregarResena(titulo: string, titular:string, texto: string, foto: any) {
    return this.conexionBase.executeSql('INSERT INTO contenido(titulo, titular, texto, foto, id_tema) VALUES (?,?,?,?,2)', [titulo, titular, texto, foto]).then(res => {
      this.presentAlert("Reseña", "Reseña agregada exitosamente");
      this.mostrarNoticia();
      this.mostrarResena();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

  //CREACION DE USUARIOS

  seleccionarUsuario() {
    return this.conexionBase.executeSql('SELECT * FROM usuario WHERE estado = 1', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++){
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nickName: res.rows.item(i).nickName,
            clave: res.rows.item(i).clave,
            correo: res.rows.item(i).correo,
            foto: res.rows.item(i).foto,
            estado: res.rows.item(i).estado,
            id_rol: res.rows.item(i).id_rol
          })
        }
      }
      this.listadoUsuario.next(items as any);
    })
  }

  seleccionarUsuarioSuspendidos() {
    return this.conexionBase.executeSql('SELECT * FROM usuario WHERE estado = 0', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nickName: res.rows.item(i).nickName,
            clave: res.rows.item(i).clave,
            correo: res.rows.item(i).correo,
            foto: res.rows.item(i).foto,
            estado: res.rows.item(i).estado,
            id_rol: res.rows.item(i).id_rol
          })
        }
      }
      this.listadoUsuarioBan.next(items as any);
    })
  }

  getCorreoUsuario(nickName: string) { 
    return this.conexionBase.executeSql('SELECT correo FROM usuario WHERE nickname = ?', [nickName]).then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0).correo;
      } else {
        return null;
      }
    }).catch(e => {
      console.error('Error al obtener el correo: ', e);
      return null;
    });
  }

  agregarUsuario(nickName: string, correo: string , clave: string) {
    return this.conexionBase.executeSql('INSERT INTO usuario(nickName, correo, clave, id_rol) VALUES(?,?,?,2);', [nickName, correo, clave]).then(res => {
      this.presentAlert("Registro", "Se registro correctamente");
      this.seleccionarUsuario();
    }).catch(e => {
      this.presentAlert('Registro', 'Error: ' + JSON.stringify(e));
    })
  }

  agregarModerador(nickName: string, correo: string, clave: string) {
    return this.conexionBase.executeSql('INSERT INTO usuario(nickName, correo, clave, id_rol) VALUES(?,?,?,1);', [nickName, correo, clave]).then(res => {
      this.seleccionarUsuario();
    }).catch(e => {
      this.presentAlert('Registro', 'Error: ' + JSON.stringify(e));
    })
  }

  suspenderUsuario(id:string) {
    this.alertaConfirmacion("¿Esta seguro que desea suspender a este usuario?", () => {
      return this.conexionBase.executeSql('UPDATE usuario SET estado = 0 WHERE id_usuario = ?', [id]).then(res => {
        this.presentAlert("Ususario suspendido", "El usuario a sido suspendido exitosamente");
        this.seleccionarUsuario();
        this.seleccionarUsuarioSuspendidos();
      }).catch(e => {
        this.presentAlert('Usuario suspendido', 'ERROR: ' + JSON.stringify(e));
      })
    })
  }

  activarUsuario(id:string) {
    this.alertaConfirmacion("¿Esta seguro que quiere volver a activar al usuario?", () => {
      return this.conexionBase.executeSql('UPDATE usuario SET estado = 1 WHERE id_usuario = ?', [id]).then(res => {
        this.presentAlert("Ususario activado", "El usuario a sido activado exitosamente");
        this.seleccionarUsuario();
        this.seleccionarUsuarioSuspendidos();
      }).catch(e => {
        this.presentAlert('Usuario activado', 'ERROR: ' + JSON.stringify(e));
      })
    })
  }

  borrarUsuario(id: string) {
    this.alertaConfirmacion("¿Esta seguro que desea eliminar a este usuario?", () => {
      return this.conexionBase.executeSql('DELETE FROM usuario WHERE id_usuario = ?', [id]).then(res => {
        this.presentAlert("Eliminar", "Usuario eliminado permanentemente.");
        this.seleccionarUsuario();
        this.seleccionarUsuarioSuspendidos();
      }).catch(e => {
        this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
      })
    })
  }

  //Metodo para saber si el usuario esta logeado
  private usuarioLogeado = new BehaviorSubject<boolean>(false);
  private rolUsuario = new BehaviorSubject<number | null>(null);

  estadoUsuario() {
    return this.usuarioLogeado.asObservable();
  }

  getRolUsuario() {
    return this.rolUsuario.asObservable();
  }

  inicioSesion(nickName: string, clave: string) {
    return this.conexionBase.executeSql('SELECT * FROM usuario WHERE nickname = ? AND clave = ? AND estado = 1', [nickName, clave]).then(res => {
      if (res.rows.length > 0) {
        const usuario = res.rows.item(0);
        this.usuarioLogeado.next(true);
        this.rolUsuario.next(usuario.id_rol);
        return true;
      } else {
        this.usuarioLogeado.next(false);
        this.rolUsuario.next(null);
        return false;
      }
    }).catch(e => {
      this.presentAlert('Registro', 'Error: ' + JSON.stringify(e));
      this.usuarioLogeado.next(false);
      this.rolUsuario.next(null);
    })
  }

  cerrarSesion() {
      this.presentAlert('Cerrar sesión', 'Se cerro sesión exitosamente.');
      this.usuarioLogeado.next(false);
      this.rolUsuario.next(null);
    
  }

  obtenerIdUsuario(nickName: string) {
    return this.conexionBase.executeSql('SELECT id_usuario FROM usuario WHERE nickname = ?', [nickName]).then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0).id_usuario;
      } else {
        return null;
      }
    }).catch(e => {
      console.error('Error al obtener el id: ', e);
      return null;
    });
  }

  obtenerClave(nickName: string) {
    return this.conexionBase.executeSql('SELECT clave FROM usuario WHERE nickname = ?', [nickName]).then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0).clave;
      } else {
        return null
      }
    }).catch(e => {
      this.presentAlert('ClAVE USUARIO', 'ERROR: ' + JSON.stringify(e));
      return null;
    })
  }

  obtenerCorreo(nickName: string) {
    return this.conexionBase.executeSql('SELECT correo FROM usuario WHERE nickname = ?', [nickName]).then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0).correo;
      } else {
        return null
      }
    }).catch(e => {
      this.presentAlert('Correo USUARIO', 'ERROR: ' + JSON.stringify(e));
      return null;
    })
  }

  seleccionarPerfil(id: string) {
    return this.conexionBase.executeSql('SELECT nickName, correo, foto FROM usuario WHERE id_usuario = ?', [id]).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++){
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nickName: res.rows.item(i).nickName,
            clave: res.rows.item(i).clave,
            correo: res.rows.item(i).correo,
            foto: res.rows.item(i).foto,
            estado: res.rows.item(i).estado,
            id_rol: res.rows.item(i).id_rol
          })
        }
      }
      this.listaPerfil.next(items as any);
    })
  }

  guardarFotoPerfil(foto: string, id:string) {
    return this.conexionBase.executeSql('UPDATE usuario SET foto = ? WHERE id_usuario = ?;', [foto, id]).then(res => {
      this.presentAlert("Foto", "Se guardo la foto exitosamente");
      this.seleccionarUsuario();
    }).catch(e => {
      this.presentAlert('Foto', 'Error: ' + JSON.stringify(e));
    })
  }


  cambiarContrasena(id:string, clave:string) {
    return this.conexionBase.executeSql('UPDATE usuario SET clave = ? WHERE id_usuario = ?', [clave, id]).then(res => {
      this.seleccionarUsuario();
    }).catch(e => {
      this.presentAlert('Cambio de contraseña', 'Error: ' + JSON.stringify(e));
    })
  }

  cambioCorreo(id:string, correo: string) {
    this.alertaConfirmacion("¿Esta seguro que desea cambiar su correo?", () => {
      return this.conexionBase.executeSql('UPDATE usuario SET correo = ? WHERE id_usuario = ?', [correo, id]).then(res => {
        this.presentAlert("Cambio de correo", "Correo cambiado exitosamente");
        this.seleccionarUsuario();
      }).catch(e => {
        this.presentAlert('Cambio de correo', 'Error: ' + JSON.stringify(e));
      })
    })
  }

  // ---------------Metodos para publicar en el foro-------------//

  mostrarForo() {
    return this.conexionBase.executeSql('SELECT f.titulo, u.nickName, f.texto, u.id_usuario, f.id_foro FROM foro f JOIN usuario u ON (f.id_usuario = u.id_usuario)', []).then(res => {
      let items: Foro[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++){
          items.push({
            id_foro: res.rows.item(i).id_foro,
            titulo: res.rows.item(i).titulo,
            autor: res.rows.item(i).nickName,
            texto: res.rows.item(i).texto,
            id_usuario: res.rows.item(i).id_usuario
          })
        }
      }
      this.listaForo.next(items as any);
    })
  }

  agregarForo(titulo:string, texto:string, id:string) {
    return this.conexionBase.executeSql('INSERT INTO foro(titulo, texto, id_usuario) VALUES(?,?,?)', [titulo, texto, id]).then(res => {
      this.presentAlert("Foro", "Su foro se publico exitosamente")
      this.mostrarForo();
    }).catch(e => {
      this.presentAlert('Agergar foro', 'ERROR: ' + JSON.stringify(e));
    })
  }

  eliminarForo(id: string) {
    this.alertaConfirmacion("Esta seguro que quiere eliminar este foro?", () => {
      return this.conexionBase.executeSql('DELETE FROM foro WHERE id_foro = ?', [id]).then(res => {
        this.presentAlert("Eliminar", "Foro eliminado exitosamente");
        this.mostrarForo();
      }).catch(e => {
        this.presentAlert('Elimnar foro', 'ERROR: ' + JSON.stringify(e));
      })
    })
  }

  //------------Agregar comentarios al foro----------------------//

  mostrarComentarioForo(id_foro:number) {
    return this.conexionBase.executeSql('SELECT c.fecha_comentario, c.texto, u.nickName, u.foto, c.id_usuario, c.id_contenido, c.id_foro, c.id_comentario FROM comentario c JOIN usuario u ON (c.id_usuario = u.id_usuario) WHERE c.id_foro = ? ORDER BY c.fecha_comentario DESC', [id_foro]).then(res => {
      let items: Comentario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++){
          items.push({
            id_comentario: res.rows.item(i).id_comentario,
            fecha_comentario: res.rows.item(i).fecha_comentario,
            texto: res.rows.item(i).texto,
            id_usuario: res.rows.item(i).id_usuario,
            id_contenido: res.rows.item(i).id_contenido,
            id_foro: res.rows.item(i).id_foro,
            nickName: res.rows.item(i).nickName,
            foto: res.rows.item(i).foto
          })
        }
      }
      this.listaComentarioForo.next(items as any);
    })
  }

  mostrarComentarioContenido(id_contenido: number) {
    return this.conexionBase.executeSql('SELECT c.fecha_comentario, c.texto, u.nickName, u.foto, c.id_usuario, c.id_contenido, c.id_comentario, c.id_foro FROM comentario c JOIN usuario u ON (c.id_usuario = u.id_usuario) WHERE c.id_contenido = ? ORDER BY c.fecha_comentario DESC', [id_contenido]).then(res => {
      let items: Comentario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_comentario: res.rows.item(i).id_comentario,
            fecha_comentario: res.rows.item(i).fecha_comentario,
            texto: res.rows.item(i).texto,
            id_usuario: res.rows.item(i).id_usuario,
            id_contenido: res.rows.item(i).id_contenido,
            id_foro: res.rows.item(i).id_foro,
            nickName: res.rows.item(i).nickName,
            foto: res.rows.item(i).foto
          })
        }
      }
      this.listaComentarioContenido.next(items as any);
    })
  }

  agregarComentario(texto: string, id_usuario: number, id_foro: number | null, id_contenido: number | null, ) {
    return this.conexionBase.executeSql('INSERT INTO comentario (fecha_comentario, texto, id_usuario, id_foro, id_contenido) VALUES(DATE("now"), ?, ?, ?, ?)', [texto, id_usuario, id_foro, id_contenido]).then(res => {
      this.presentAlert("Comentario", "Su comentario se agrego correctamente");
      if (id_foro !== null) {
        this.mostrarComentarioForo(id_foro);
      } else if (id_contenido !== null) {
        this.mostrarComentarioContenido(id_contenido);
      }
    }).catch(e => {
      this.presentAlert("Agregar comentario", "ERROR: " + JSON.stringify(e));
    })
  }

  eliminarComentarioForo(id: number, id_foro:number) {
    this.alertaConfirmacion("Esta seguro que quiere eliminar el comentario?", () => {
      return this.conexionBase.executeSql('DELETE FROM comentario WHERE id_comentario = ?', [id]).then(res => {
        this.presentAlert("Eliminar", "Comentario eliminado correctamente");
        this.mostrarComentarioForo(id_foro);
      }).catch(e => {
        this.presentAlert('Eliminar comentario', 'ERROR: ' + JSON.stringify(e));
      })
    })
  }

  eliminarComentarioContenido(id: number, id_contenido:number) {
    this.alertaConfirmacion("Esta seguro que quiere eliminar el comentario?", () => {
      return this.conexionBase.executeSql('DELETE FROM comentario WHERE id_comentario = ?', [id]).then(res => {
        this.presentAlert("Eliminar", "Comentario eliminado correctamente");
        this.mostrarComentarioContenido(id_contenido);
      }).catch(e => {
        this.presentAlert('Eliminar comentario', 'ERROR: ' + JSON.stringify(e));
      })
    })
  }

  //-------------Favoritos---------------------------//

  mostrarFavoritos(id_usuario:number) {
    return this.conexionBase.executeSql('SELECT fav.id_favorito, fav.fecha_agregado, fav.id_usuario, fav.id_contenido, con.titulo, con.titular, con.foto, con.id_tema FROM favorito fav JOIN contenido con ON (fav.id_contenido = con.id_contenido) WHERE fav.id_usuario = ? ORDER BY fav.fecha_agregado DESC', [id_usuario]).then(res => {
      let items: Favorito[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++){
          items.push({
            id_favorito: res.rows.item(i).id_favorito,
            fecha_agregado: res.rows.item(i).fecha_agregado,
            id_usuario: res.rows.item(i).id_usuario,
            id_contenido: res.rows.item(i).id_contenido,
            titulo: res.rows.item(i).titulo,
            titular: res.rows.item(i).titular,
            foto: res.rows.item(i).foto,
            id_tema: res.rows.item(i).id_tema
          })
        }
      }
      this.listaFavorito.next(items as any);
    })
  }

  agregarFavorito(id_usuario:number, id_contenido:number) {
    return this.conexionBase.executeSql('INSERT INTO favorito (fecha_agregado, id_usuario, id_contenido) VALUES (DATE("now"), ?, ?)', [id_usuario, id_contenido]).then(res => {
      this.presentAlert("Favorito", "Se agrego correctamente a favoritos");
      this.mostrarFavoritos(id_usuario);
    }).catch(e => {
      this.presentAlert("Agregar favorito", "ERROR: " + JSON.stringify(e));
    })
  }

  borrarFavorito(id_favorito: number, id_usuario: number) {
    this.alertaConfirmacion("¿Esta seguro que quiere quitar de favoritos?", () => {
      return this.conexionBase.executeSql('DELETE FROM favorito WHERE id_favorito = ?', [id_favorito]).then(res => {
        this.presentAlert("Eliminar", "Favorito eliminado correctamente");
        this.mostrarFavoritos(id_usuario);
      })
    }).catch(e => {
      this.presentAlert('Eliminar favorito', 'ERROR: ' + JSON.stringify(e));
    })
  }

  //-----------------mostrar contenido para el home---------//
  listaHomeNotcias = new BehaviorSubject([]);
  listaHomeForos = new BehaviorSubject([]);
  listaHomeResenas = new BehaviorSubject([]);

  fetchHomeNoticia(): Observable<Contenido[]>{
    return this.listaHomeNotcias.asObservable();
  }

  fetchHomeForos(): Observable<Contenido[]>{
    return this.listaHomeForos.asObservable();
  }

  fetchHomeResenas(): Observable<Contenido[]>{
    return this.listaHomeResenas.asObservable();
  }

  homeNoticias() {
    return this.conexionBase.executeSql('SELECT * FROM contenido WHERE id_tema = 1 ORDER BY id_contenido DESC LIMIT 3', []).then(res => {
      let items: Contenido[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++){
          items.push({
            id_contenido: res.rows.item(i).id_contenido,
            titulo: res.rows.item(i).titulo,
            titular: res.rows.item(i).titular,
            texto: res.rows.item(i).texto,
            foto: res.rows.item(i).foto,
            id_tema: res.rows.item(i).id_tema
          })
        }
      }
      this.listaHomeNotcias.next(items as any);
    })
  }

  homeForo() {
    return this.conexionBase.executeSql('SELECT f.titulo, u.nickName, f.texto, u.id_usuario, f.id_foro FROM foro f JOIN usuario u ON (f.id_usuario = u.id_usuario) ORDER BY f.id_foro DESC LIMIT 3', []).then(res => {
      let items: Foro[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++){
          items.push({
            id_foro: res.rows.item(i).id_foro,
            titulo: res.rows.item(i).titulo,
            autor: res.rows.item(i).nickName,
            texto: res.rows.item(i).texto,
            id_usuario: res.rows.item(i).id_usuario
          })
        }
      }
      this.listaHomeForos.next(items as any);
    })
  }

  homeResena() {
    return this.conexionBase.executeSql('SELECT * FROM contenido WHERE id_tema = 2 ORDER BY id_contenido DESC LIMIT 3', []).then(res => {
      let items: Contenido[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_contenido: res.rows.item(i).id_contenido,
            titulo: res.rows.item(i).titulo,
            titular: res.rows.item(i).titular,
            texto: res.rows.item(i).texto,
            foto: res.rows.item(i).foto,
            id_tema: res.rows.item(i).id_tema
          })
        }
      }
      this.listaHomeResenas.next(items as any);
    })
  }




  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertaConfirmacion(titulo: string, confirmar: Function) {
    const alert = await this.alertController.create({
      header: titulo,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Accion cancelada');
          }
        },
        {
          text: 'CONFIRMAR',
          handler: () => {
            confirmar();
          }
        }
      ],
    });

    await alert.present();
  }

}