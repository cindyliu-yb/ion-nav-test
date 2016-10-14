import { Component, Injector } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Globalization } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { Menupage2Component } from '../menupage-2/menupage-2.component';

@Component({
    styles: [require('./menupage-1.component.scss').toString()],
    template: require('./menupage-1.component.html')
})
export class Menupage1Component {

    missions = [{Title: 'mission1', Year: '2005', Country: 'UK'}, {Title: 'mission2', Year: '2006', Country: 'UK'}];

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

    goToMissionDetail(mission) {
        let nav: NavController = this.injector.get(NavController);
        nav.push(Menupage2Component);
    }
}