import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-weather-forecast',
  templateUrl: './display-weather-forecast.component.html',
  styleUrls: ['./display-weather-forecast.component.css']
})
export class DisplayWeatherForecastComponent implements OnInit {
  selectedLocation = 'Helsinki';
 
  constructor() { }

  ngOnInit() {
  }
  update(selectedLocation: string) { this.selectedLocation = selectedLocation; }
}
