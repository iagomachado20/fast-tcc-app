import { DashboardModule } from './screens/establishment/dashboard/dashboard.module';
import { LoginPageModule } from './screens/login/login.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./screens/establishment/dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./screens/client/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./screens/client/main/main.module').then( m => m.MainPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
