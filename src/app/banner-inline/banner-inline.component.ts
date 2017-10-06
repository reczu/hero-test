import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-inline',
  template: '<h1>{{title}}</h1>',
  styleUrls: ['./banner-inline.component.css']
})
export class BannerInlineComponent implements OnInit {
  title = 'Test Tour of Heroes';

  constructor() { }

  ngOnInit() {
  }

}
