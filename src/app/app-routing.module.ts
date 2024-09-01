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
    path: 'foros',
    loadChildren: () => import('./pages/foros/foros.module').then( m => m.ForosPageModule)
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
    path: 'notfound',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
