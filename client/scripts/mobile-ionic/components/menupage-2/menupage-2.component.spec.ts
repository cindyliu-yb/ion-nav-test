import { it, injectAsync, beforeEachProviders, TestComponentBuilder } from 'angular2/testing';
import { Menupage2Component } from './menupage-2.component';

describe('Module: mobile-ionic', () => {
            describe('Component: Menupage2Component', () => {

                        beforeEachProviders(() => []);

                        it('should be defined', injectAsync([TestComponentBuilder], (tcb) => {
                                        return tcb.createAsync(Menupage2Component)
                                            .then((fixture) => {
                                                    let element = fixture.debugElement.nativeElement;
                                                    let cmpInstance = <Menupage2Component>fixture.debugElement.componentInstance;
                    fixture.detectChanges();

                    expect(cmpInstance).toBeDefined();
                    expect(element).toBeDefined();
                });
        }));

    });
});