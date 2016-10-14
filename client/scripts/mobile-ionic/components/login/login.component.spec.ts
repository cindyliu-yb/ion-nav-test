import { it, injectAsync, beforeEachProviders, TestComponentBuilder } from 'angular2/testing';
import { LoginComponent } from './login.component';

describe('Module: mobile-ionic', () => {
            describe('Component: LoginComponent', () => {

                        beforeEachProviders(() => []);

                        it('should be defined', injectAsync([TestComponentBuilder], (tcb) => {
                                        return tcb.createAsync(LoginComponent)
                                            .then((fixture) => {
                                                    let element = fixture.debugElement.nativeElement;
                                                    let cmpInstance = <LoginComponent>fixture.debugElement.componentInstance;
                    fixture.detectChanges();

                    expect(cmpInstance).toBeDefined();
                    expect(element).toBeDefined();
                });
        }));

    });
});