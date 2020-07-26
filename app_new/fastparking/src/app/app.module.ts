import { environment } from './../environments/environment';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedComponentsModule } from './components/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginPageModule } from './screens/login/login.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './interceptors/http-interceptos.service';
import { MainPageModule } from './screens/client/main/main.module';
import { DashboardModule } from './screens/establishment/dashboard/dashboard.module';
import { HistoricPageModule } from './screens/historic/historic.module';
import { FilterList } from './pipes/filter.list.pipe';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const configSocket: SocketIoConfig = { url: `${environment.socketHost}`, options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    LoginPageModule,
    MainPageModule,
    HistoricPageModule,
    CommonModule,
    DashboardModule,
    FormsModule,
    SharedComponentsModule,
    SocketIoModule.forRoot(configSocket)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    FilterList
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
