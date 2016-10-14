import { Component, Injector } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Globalization } from 'ionic-native';
import { Menupage1Component } from '../menupage-1/menupage-1.component';
import { Menupage2Component } from '../menupage-2/menupage-2.component';
import { NavController } from 'ionic-angular';

@Component({
    styles: [require('./menu.component.scss').toString()],
    template: require('./menu.component.html')
})
export class MenuComponent {

    rootPage: any = Menupage1Component; 

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

    GoToPageTwo() {
        let nav: NavController = this.injector.get(NavController);
        nav.push(Menupage2Component);
    }
}