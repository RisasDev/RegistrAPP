import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './servicios/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./Access/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./Access/perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'perfil/alumno',
    loadChildren: () => import('./Access/perfil/alumno/alumno.module').then(m => m.AlumnoPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'perfil/docente',
    loadChildren: () => import('./Access/perfil/docente/docente.module').then(m => m.DocentePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'perfil/qr-view', // Agregar esta línea para la vista QR
    loadChildren: () => import('./Access/perfil/qr-view/qr-view.module').then(m => m.QrViewPageModule),
    canActivate: [authGuard] // Si necesitas protección para esta ruta, agrega el authGuard
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./Access/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'controller',
    loadChildren: () => import('./Admin/controller/controller.module').then(m => m.ControllerPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./app/e404/e404.module').then(m => m.E404PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }