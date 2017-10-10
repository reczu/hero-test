import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHeroComponent } from './dashboard-hero.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Hero} from '../model/hero';
import {click} from '../../../testing/index';

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
