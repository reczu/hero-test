import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import {UserService} from '../model/user.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let userService: UserService;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
      const userServiceStub = {
          isLoggedIn: true,
          user: { name: 'Test User'}
      };


      TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      providers: [ {provide: UserService, useValue: userServiceStub} ]
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);

    de = fixture.debugElement.query(By.css('.welcome'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should welcome the user', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Welcome', '"Welcome ..."');
    expect(content).toContain('Test User', 'expected name');
  });

  it('should welcome "Bubba"', () => {
    userService.user.name = 'Bubba';
    fixture.detectChanges();
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false;
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });


});
