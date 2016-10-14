import { it, injectAsync, beforeEachProviders, TestComponentBuilder } from 'angular2/testing';
import { MenuComponent } from './menu.component';

describe('Module: mobile-ionic', () => {
            describe('Component: MenuComponent', () => {

                        beforeEachProviders(() => []);

                        it('should be defined', injectAsync([TestComponentBuilder], (tcb) => {
                                        return tcb.createAsync(MenuComponent)
                                            .then((fixture) => {
                                                    let element = fixture.debugElement.nativeElement;
                                                    let cmpInstance = <MenuComponent>fixture.debugElement.componentInstance;
                    fixture.detectChanges();

                    expect(cmpInstance).toBeDefined();
                    expect(element).toBeDefined();
                });
        }));

    });
});