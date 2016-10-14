import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Globalization } from 'ionic-native';
import { LoginComponent } from '../login/login.component';
import { MenuComponent } from '../menu/menu.component';
import { Menupage1Component } from '../menupage-1/menupage-1.component';
import { Menupage2Component } from '../menupage-2/menupage-2.component';

@Component({
    styles: [require('./main.component.scss').toString()],
    template: require('./main.component.html')
})
export class MainComponent {
    root: any = LoginComponent;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Globalization.getPreferredLanguage().then(
                res => { },
                err => { }
            );
        });
    }
}

export const deepLinkConfig = {
    links: [
        { component: LoginComponent, name: 'login' },
        { component: MenuComponent, name: 'menu'},
        { component: Menupage1Component , name: 'menupage1'},
        { component: Menupage2Component , name: 'menupage2'}
    ]
};