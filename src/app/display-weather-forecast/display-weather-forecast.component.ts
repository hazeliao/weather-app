import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-display-weather-forecast',
  templateUrl: './display-weather-forecast.component.html',
  styleUrls: ['./display-weather-forecast.component.css']
})
export class DisplayWeatherForecastComponent implements OnInit {
  selectedLocation = 'Helsinki';
  oneWeeksForecast: Array<string> | undefined;
  threeDaysForecast: Array<string> | undefined;

 
  constructor(private weatherDataService: WeatherDataService) { }

  ngOnInit() {
    this.getWeatherForecastFromFMI();
  }
  
  update(selectedLocation: string) { this.selectedLocation = selectedLocation; }


  formatWeatherXmlData(XMLData: string): void {
    const parser = new DOMParser();

    let xmlDoc = parser.parseFromString(XMLData, "text/xml");
    const arrayOfTemperaturesAsElements = xmlDoc.getElementsByTagName("BsWfs:ParameterValue");
    const arrayOfTimesAsElements = xmlDoc.getElementsByTagName("BsWfs:Time");
    this.threeDaysForecast = [];
    for (let i = 0; i < arrayOfTemperaturesAsElements.length; i++) {
        this.threeDaysForecast.push("On " + moment(arrayOfTimesAsElements[i].textContent).format('MMMM Do YYYY, h:mm:ss a') + " the temperature will be " + arrayOfTemperaturesAsElements[i].textContent + " degrees Celcius.");
    }
    console.log(arrayOfTemperaturesAsElements);
  }


  getWeatherForecastFromFMI(): void {
    this.weatherDataService.setPlace(this.selectedLocation);
    this.weatherDataService.getWeatherForecastForTheNext50hours().subscribe((result) => {
      this.formatWeatherXmlData(result);
    },
    (err) => {
      alert('Something went wrong: ' + JSON.stringify(err));
    });
  }



}
