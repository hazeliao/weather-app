import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DisplayWeatherForecastComponent } from './display-weather-forecast/display-weather-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayWeatherForecastComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
