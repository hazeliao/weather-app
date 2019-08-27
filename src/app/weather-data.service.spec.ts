import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { WeatherDataService } from './weather-data.service';

describe('WeatherDataService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherDataService, HttpClient]
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: WeatherDataService = TestBed.get(WeatherDataService);
    expect(service).toBeTruthy();
  });
  
  it(`should be initialized properly`, () => {
    const service: WeatherDataService = TestBed.get(WeatherDataService);    
    expect(service.service).toEqual('WFS');
    expect(service.version).toEqual('2.0.0');
    expect(service.request).toEqual('getFeature');
    expect(service.storedquery_id).toEqual('fmi::forecast::harmonie::hybrid::point::simple');
    expect(service.parameters).toEqual('temperature');
    expect(service.place).toEqual('Helsinki');
    expect(service.timestep).toEqual(1440);
    expect(service.startTime).toBeUndefined();
    expect(service.endTime).toBeUndefined();
  });

  it(`should call the getWeatherForecastForTheNext50hours function successfully and handle failure`, () => {
    const service: WeatherDataService = TestBed.get(WeatherDataService);
    service.getWeatherForecastForTheNext50hours().subscribe((res) => {
        expect(res).toEqual("mockresponse");
    });
    const req = httpTestingController.expectOne('assets/dummy.xml');
    req.flush("mockresponse", { status: 200, statusText: 'custom mock response success' });
    service.getWeatherForecastForTheNext50hours().subscribe((res) => {
      //Should not arrive here!
    },(err) => {
      expect(err.error).toEqual("errormockresponse");
    });
    const reqFail = httpTestingController.expectOne('assets/dummy.xml');
    reqFail.flush("errormockresponse", { status: 404, statusText: 'custom mock response failure' });
  });

  it(`should call the getCurrentWeeksWeather function successfully and handle failure`, () => {
    const service: WeatherDataService = TestBed.get(WeatherDataService);
    service.getCurrentWeeksWeather().subscribe((res) => {
        expect(res).toEqual("mockresponse");
    });
    const req = httpTestingController.expectOne('assets/owmdata.json');
    req.flush("mockresponse", { status: 200, statusText: 'custom mock response success' });
    service.getCurrentWeeksWeather().subscribe((res) => {
      //Should not arrive here!
    },(err) => {
      expect(err.error).toEqual("errormockresponse");
    });
    const reqFail = httpTestingController.expectOne('assets/owmdata.json');
    reqFail.flush("errormockresponse", { status: 404, statusText: 'custom mock response failure' });
  });
});
