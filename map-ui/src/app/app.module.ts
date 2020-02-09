import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Environment, LocalEnvironment} from './models/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MapModule} from './map/map.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MapModule
  ],
  providers: [{provide: Environment, useClass: Environment}],
  bootstrap: [AppComponent]
})
export class AppModule {}
