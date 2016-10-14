/// <reference path="../../../node_modules/zone.js/dist/zone.js.d.ts" />
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MainComponent, deepLinkConfig } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { Menupage1Component } from './components/menupage-1/menupage-1.component';
import { Menupage2Component } from './components/menupage-2/menupage-2.component';

if (CONFIG_MODE === 'prod') {
    enableProdMode();
}

@NgModule({
    declarations: [MainComponent, LoginComponent, MenuComponent, Menupage1Component, Menupage2Component],
    imports: [
        IonicModule.forRoot(MainComponent, { iconMode: 'ios', mode: 'ios' }, deepLinkConfig)
    ],
    providers: [],
    bootstrap: [IonicApp],
    entryComponents: [LoginComponent, MenuComponent, Menupage1Component, Menupage2Component]
})

class MainModule { }

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(MainModule);
});