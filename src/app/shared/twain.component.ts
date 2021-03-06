import { Component, OnInit } from '@angular/core';
import {TwainService} from './twain.service';

@Component({
  selector: 'app-twain',
  template: '<p class="twain"><i>{{quote}}</i></p>'
})
export class TwainComponent implements OnInit {
  intervalId: number;
  quote = '...';

  constructor(private twainService: TwainService) { }

  ngOnInit() {
    this.twainService.getQuote().then(quote => this.quote = quote);
  }

}
