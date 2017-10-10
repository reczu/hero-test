import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TwainComponent } from './twain.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {TwainService} from './twain.service';

describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let spy: jasmine.Spy;
  let twainService: TwainService;

  const testQuote = 'Test Quote';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TwainComponent ],
      providers: [ TwainService ]
    });

    fixture = TestBed.createComponent(TwainComponent);
    component = fixture.componentInstance;

    twainService = fixture.debugElement.injector.get(TwainService);

    spy = spyOn(twainService, 'getQuote')
        .and.returnValue(Promise.resolve(testQuote));


    de = fixture.debugElement.query(By.css('.twain'));
    el = de.nativeElement;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show quote before OnInit', () => {
    expect(el.textContent).toBe('', 'nothing displayed');
    expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
  });

  it('should still no show quote after component initialized', () => {
    fixture.detectChanges();
    expect(el.textContent).toBe('...', 'no quote yet');
    expect(spy.calls.any()).toBe(true, 'getQuote called');
  });

  it('should show quote after getQuote promise (async)', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then( () => {
      fixture.detectChanges();
      expect(el.textContent).toBe(testQuote, 'Our test wuote');
    });
  }));

  it('should show quote after getQuote promise (async)', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(el.textContent).toBe(testQuote);
  }));

  it('should show quote after getQuote promise (done)', (done: any) => {
    fixture.detectChanges();

    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      expect(el.textContent).toBe(testQuote);
      done();
    });
  });
});
