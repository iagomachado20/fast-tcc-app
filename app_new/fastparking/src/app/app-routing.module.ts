import { LoginPageModule } from './screens/login/login.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./screens/login/login.module').then( m => m.LoginPageModule)
  // },
  {
    path: '',
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
