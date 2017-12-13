import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Component, ViewChild } from '@angular/core';
import { MenuController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  signinPage: any = SigninPage;
  signupPage: any = SignupPage;
  @ViewChild('root') rootPage: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController) {
      firebase.initializeApp({
        apiKey: "AIzaSyA-hxdrgDMnUL1XHeoAQxNUh7deQ10UZ64",
        authDomain: "recipebook-app-d08be.firebaseapp.com",
      });
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.rootPage.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {

  }
}
