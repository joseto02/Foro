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
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'cambio-p',
    loadChildren: () => import('./pages/cambio-p/cambio-p.module').then( m => m.CambioPPageModule)
  },
  {
    path: 'cambio-u',
    loadChildren: () => import('./pages/cambio-u/cambio-u.module').then( m => m.CambioUPageModule)
  },  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'olvpas',
    loadChildren: () => import('./pages/olvpas/olvpas.module').then( m => m.OlvpasPageModule)
  },
  {
    path: 'termino',
    loadChildren: () => import('./pages/termino/termino.module').then( m => m.TerminoPageModule)
  },
  {
    path: 'baneo',
    loadChildren: () => import('./pages/baneo/baneo.module').then( m => m.BaneoPageModule)
  },
  {
    path: 'elimforo',
    loadChildren: () => import('./pages/elimforo/elimforo.module').then( m => m.ElimforoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
