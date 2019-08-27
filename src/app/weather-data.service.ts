import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private http: HttpClient;
  readonly weatherServiceBaseURL: string = environment.weatherDataBaseURL; //"http://opendata.fmi.fi/wfs?";

  //service=WFS
  //&version=2.0.0
  //&request=getFeature
  //&storedquery_id=fmi::forecast::harmonie::hybrid::point::simple
  //&parameters=temperature
  //&place=helsinki
  //&timestep=360
  //&starttime=2019-08-25T00:00:00Z
  //&endtime=2019-08-31T21:00:00Z&";

  service = 'WFS'; 
  version = '2.0.0';
  request = 'getFeature';
  storedquery_id = 'fmi::forecast::harmonie::hybrid::point::simple';
  parameters = 'temperature';
  place = 'Helsinki'; // Default to Helsinki
  timestep = 60 * 24;//24 hour timestep 6 hour timesteps.
  startTime: string | undefined;
  endTime: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  getWeatherForecastForTheNext50hours(): Observable<string> {

    let now = moment();
    const threeDaysFromNow = now.clone().add(3, 'days');

    this.startTime = now.toISOString();
    this.endTime = threeDaysFromNow.toISOString();

    const weatherDataRequest = 
      this.weatherServiceBaseURL + 
      'service='          + this.service +
      '&version='         + this.version +
      '&request='         + this.request +
      '&storedquery_id='  + this.storedquery_id +
      '&parameters='      + this.parameters +
      '&place='           + this.place +
      '&timestep='        + this.timestep +
      '&startTime='       + this.startTime +
      '&endTime='         + this.endTime;

    if ( environment.production === true ) {
      return this.http.get(weatherDataRequest, { responseType: 'text' });
    } else {
      return this.http.get('assets/dummy.xml', { responseType: 'text' });
    }

  }

  getCurrentWeeksWeather(): Observable<any> {
    if ( environment.production === true ) {
      return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q=' + this.place + ',fi&units=metric&APPID=8e0ef355bcef9304849ea7bfed096124');
    } else {
      return this.http.get('assets/owmdata.json');
    }
  }

  setPlace(arg0: string): void {
    this.place = arg0;
  }
}
