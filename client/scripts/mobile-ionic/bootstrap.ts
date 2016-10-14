/// <reference path="../../../node_modules/zone.js/dist/zone.js.d.ts" />
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MainComponent, deepLinkConfig } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';

if (CONFIG_MODE === 'prod') {
    enableProdMode();
}

@NgModule({
    declarations: [MainComponent, LoginComponent],
    imports: [
        IonicModule.forRoot(MainComponent, { iconMode: 'ios', mode: 'ios' }, deepLinkConfig)
    ],
    providers: [],
    bootstrap: [IonicApp],
    entryComponents: [MainComponent]
})
class MainModule { }

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(MainModule);
});