import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BannerInlineComponent } from './banner-inline/banner-inline.component';
import { BannerComponent } from './banner/banner.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TwainComponent } from './shared/twain.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHeroComponent } from './dashboard/dashboard-hero.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerInlineComponent,
    BannerComponent,
    WelcomeComponent,
    TwainComponent,
    DashboardComponent,
    DashboardHeroComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
