import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hero} from '../model/hero';

@Component({
  selector: 'app-dashboard-hero',
  templateUrl: './dashboard-hero.component.html',
  styleUrls: ['./dashboard-hero.component.css']
})
export class DashboardHeroComponent implements OnInit {
  @Input() hero: Hero;
  @Output() selected = new EventEmitter<Hero>();

  click() { this.selected.emit(this.hero); }

  ngOnInit() {
  }

}
