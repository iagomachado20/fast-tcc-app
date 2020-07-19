import { User } from './models/user.model';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthServiceProvider } from './services/auth.service';
import { Subscription } from 'rxjs';

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
      title: 'Favoritos',
      url: '/favorites',
      icon: 'heart'
    },
    {
      title: 'Histórico',
      url: '/history',
      icon: 'archive'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthServiceProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

    this.sub = this.auth.setUserLogged.subscribe(user => {
      this.user = user;
    });

  }

  logout() {

    this.auth.clearSession();
    this.sub.unsubscribe();

  }
}
