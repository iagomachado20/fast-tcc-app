import { User, TypeUser } from './models/user.model';
import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthServiceProvider } from './services/auth.service';
import { Subscription } from 'rxjs';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  sub: Subscription;
  user: User;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/main',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Histórico',
      url: '/history',
      icon: 'archive'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthServiceProvider,
    public menu: MenuController,
    public util: UtilService
  ) {
    this.initializeApp();

    this.util.submitEventMenu.subscribe(eventMenu => {

      this.menu.open('menu');

    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

    this.sub = this.auth.setUserLogged
    .subscribe((user: User) => {
      this.user = user;

      if (user.perfil === TypeUser.Client) {

        this.appPages.push({
          title: 'Favoritos',
          url: '/favorites',
          icon: 'heart'
        });

      }

    });

  }

  logout() {

    this.auth.clearSession();
    this.sub.unsubscribe();

  }
}
