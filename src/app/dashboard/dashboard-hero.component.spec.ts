import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DashboardHeroComponent } from './dashboard-hero.component';
import { DebugElement, Component } from '@angular/core';

import { click } from '../../../testing/index';
import { Hero } from '../model/hero';

describe('DashboardHeroComponent', () => {
  let component: DashboardHeroComponent;
  let fixture: ComponentFixture<DashboardHeroComponent>;
  let heroEl: DebugElement;
  let expectedHero: Hero;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeroComponent);
    component = fixture.componentInstance;
    heroEl = fixture.debugElement.query(By.css('.hero'));

    expectedHero = new Hero(42, 'Test Name');
    component.hero = expectedHero;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should display hero name', () => {
    const expectedName = expectedHero.name.toUpperCase();
    expect(heroEl.nativeElement.textContent).toContain(expectedName);
  });

  it('should raise selected event when clicked', () => {
    let selectedHero: Hero;
    component.selected.subscribe((hero: Hero) => selectedHero = hero);

    click(heroEl);
    expect(selectedHero).toBe(expectedHero);
  });
});



//////////////////////////////////////
describe('DashboardHeroComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let heroEl: DebugElement;

  beforeEach( async(() => {
      TestBed.configureTestingModule({
          declarations: [ DashboardHeroComponent, TestHostComponent ], // declare both
      }).compileComponents();
  }));

  beforeEach(() => {
      // create TestHostComponent instead of DashboardHeroComponent
      fixture  = TestBed.createComponent(TestHostComponent);
      testHost = fixture.componentInstance;
      heroEl   = fixture.debugElement.query(By.css('.hero')); // find hero
      fixture.detectChanges(); // trigger initial data binding
  });

  it('should display hero name', () => {
      const expectedPipedName = testHost.hero.name.toUpperCase();
      expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
      click(heroEl);
      // selected hero should be the same data bound hero
      expect(testHost.selectedHero).toBe(testHost.hero);
  });
});

@Component({
    template: `<app-dashboard-hero [hero]="hero" (selected)="onSelected($event)"></app-dashboard-hero>`
})
class TestHostComponent {
  hero = new Hero(42, 'Test Name');
  selectedHero: Hero;
  onSelected(hero: Hero) { this.selectedHero = hero; }
}
