import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./pages/noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./pages/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
  },
  {
    path: 'cambio-p',
    loadChildren: () => import('./pages/cambio-p/cambio-p.module').then(m => m.CambioPPageModule)
  },
  {
    path: 'cambio-u',
    loadChildren: () => import('./pages/cambio-u/cambio-u.module').then(m => m.CambioUPageModule)
  },
  {
    path: 'noticia-1',
    loadChildren: () => import('./pages/noticia-1/noticia-1.module').then( m => m.Noticia1PageModule)
  },
  {
    path: 'noticia-2',
    loadChildren: () => import('./pages/noticia-2/noticia-2.module').then( m => m.Noticia2PageModule)
  },
  {
    path: 'noticia-3',
    loadChildren: () => import('./pages/noticia-3/noticia-3.module').then( m => m.Noticia3PageModule)
  },
  {
    path: 'foro-1',
    loadChildren: () => import('./pages/foro-1/foro-1.module').then( m => m.Foro1PageModule)
  },
  {
    path: 'foro-2',
    loadChildren: () => import('./pages/foro-2/foro-2.module').then( m => m.Foro2PageModule)
  },
  {
    path: 'foro-3',
    loadChildren: () => import('./pages/foro-3/foro-3.module').then( m => m.Foro3PageModule)
  },
  {
    path: 'foro-4',
    loadChildren: () => import('./pages/foro-4/foro-4.module').then( m => m.Foro4PageModule)
  },
  {
    path: 'foro-5',
    loadChildren: () => import('./pages/foro-5/foro-5.module').then( m => m.Foro5PageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'olvpas',
    loadChildren: () => import('./pages/olvpas/olvpas.module').then(m => m.OlvpasPageModule)
  },
  {
    path: 'termino',
    loadChildren: () => import('./pages/termino/termino.module').then(m => m.TerminoPageModule)
  },
  {
    path: 'favorito',
    loadChildren: () => import('./pages/favorito/favorito.module').then( m => m.FavoritoPageModule)
  },
  {
    path: 'crear-contenido',
    loadChildren: () => import('./pages/crear-contenido/crear-contenido.module').then(m => m.CrearContenidoPageModule)
  },
  {
    path: 'editar-contenido',
    loadChildren: () => import('./pages/editar-contenido/editar-contenido.module').then(m => m.EditarContenidoPageModule)
  },
  {
    path: 'insertar',
    loadChildren: () => import('./pages/insertar/insertar.module').then(m => m.InsertarPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosPageModule)
  },
  {
    path: 'crear-resena',
    loadChildren: () => import('./pages/crear-resena/crear-resena.module').then(m => m.CrearResenaPageModule)
  },
  {
    path: 'foro-agregar',
    loadChildren: () => import('./pages/foro-agregar/foro-agregar.module').then(m => m.ForoAgregarPageModule)
  },
  {
    path: 'admin-foro',
    loadChildren: () => import('./pages/admin-foro/admin-foro.module').then(m => m.AdminForoPageModule)
  },
  {
    path: 'foro',
    loadChildren: () => import('./pages/foro/foro.module').then(m => m.ForoPageModule)
  },
  {
    path: 'foro-detalle',
    loadChildren: () => import('./pages/foro-detalle/foro-detalle.module').then(m => m.ForoDetallePageModule)
  },
  {
    path: 'noticia-detalle',
    loadChildren: () => import('./pages/noticia-detalle/noticia-detalle.module').then(m => m.NoticiaDetallePageModule)
  },
  {
    path: 'resena',
    loadChildren: () => import('./pages/resena/resena.module').then(m => m.ResenaPageModule)
  },
  {
    path: 'resena-detalle',
    loadChildren: () => import('./pages/resena-detalle/resena-detalle.module').then(m => m.ResenaDetallePageModule)
  },
  {
    path: 'estrenos',
    loadChildren: () => import('./pages/estrenos/estrenos.module').then(m => m.EstrenosPageModule)
  },
  {
    path: 'moderador',
    loadChildren: () => import('./pages/moderador/moderador.module').then(m => m.ModeradorPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then(m => m.NotfoundPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
