import { it, injectAsync, beforeEachProviders, TestComponentBuilder } from 'angular2/testing';
import { Menupage1Component } from './menupage-1.component';

describe('Module: mobile-ionic', () => {
            describe('Component: Menupage1Component', () => {

                        beforeEachProviders(() => []);

                        it('should be defined', injectAsync([TestComponentBuilder], (tcb) => {
                                        return tcb.createAsync(Menupage1Component)
                                            .then((fixture) => {
                                                    let element = fixture.debugElement.nativeElement;
                                                    let cmpInstance = <Menupage1Component>fixture.debugElement.componentInstance;
                    fixture.detectChanges();

                    expect(cmpInstance).toBeDefined();
                    expect(element).toBeDefined();
                });
        }));

    });
});