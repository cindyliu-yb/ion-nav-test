import { Component, Injector } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Globalization } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { MenuComponent } from '../menu/menu.component';

@Component({
    styles: [require('./login.component.scss').toString()],
    template: require('./login.component.html')
})
export class LoginComponent {

    constructor(private injector: Injector, platform: Platform) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Globalization.getPreferredLanguage().then(
                res => {},
                err => {}
            );
        });
    }

    onSuccess() {
        let nav: NavController = this.injector.get(NavController);
        nav.setRoot(MenuComponent);
    }

    onSignup() {}
}