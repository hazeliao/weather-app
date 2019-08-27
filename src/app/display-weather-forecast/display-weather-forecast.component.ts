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
  today: number = Date.now();

 
  constructor(private weatherDataService: WeatherDataService) { }

  ngOnInit() {
    this.getWeatherForecastFromFMI();
    this.getWeatherForecastFromOpenWeatherMap();
  }
  
  update(selectedLocation: string) {
    this.selectedLocation = selectedLocation;
    this.getWeatherForecastFromFMI();
  }


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

  getWeatherForecastFromOpenWeatherMap(): void {
    this.weatherDataService.getCurrentWeeksWeather().subscribe((result) => {
      console.log(result);
      this.oneWeeksForecast = [];
      
      let dateArray = [];
      let maxTempArray = [];
      let minTempArray = [];
      result.list.forEach((weatherTimeSample) => {
        const uniqueDate = moment(weatherTimeSample.dt_txt).format('YYYY-MM-DD');
        if ( dateArray.indexOf(uniqueDate) === -1 ) {
          dateArray.push(uniqueDate);
          maxTempArray.push(weatherTimeSample.main.temp_max);
          minTempArray.push(weatherTimeSample.main.temp_min);
        }
        if ( maxTempArray[maxTempArray.length-1] < weatherTimeSample.main.temp_max ) {
          maxTempArray[maxTempArray.length-1] = weatherTimeSample.main.temp_max;
        }
        if ( minTempArray[minTempArray.length-1] > weatherTimeSample.main.temp_min ) {
          minTempArray[minTempArray.length-1] = weatherTimeSample.main.temp_min;
        }
      });

      console.log("dateArray:", dateArray);
      console.log("maxTempArray:", maxTempArray);
      console.log("minTempArray:", minTempArray);

      result.list = result.list.filter((oneTime) => {
        return oneTime.dt_txt.includes("00:00:00");
      });
    

      for ( let i = 0; i < result.list.length; i++ ) {
        this.oneWeeksForecast.push("" + moment(result.list[i].dt_txt).format('dddd') + " degrees Celcius min: " + minTempArray[i] + " max: " + maxTempArray[i]);
      }
    },
    (err) => {
      alert('Something went wrong: ' + JSON.stringify(err));
    });
  }

}
