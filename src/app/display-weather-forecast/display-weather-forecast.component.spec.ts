import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DisplayWeatherForecastComponent } from './display-weather-forecast.component';
import { WeatherDataService } from '../weather-data.service';
import { MockWeatherDataService } from '../mock-weather-data-service';

describe('DisplayWeatherForecastComponent', () => {
  let component: DisplayWeatherForecastComponent;
  let fixture: ComponentFixture<DisplayWeatherForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ DisplayWeatherForecastComponent ],
      providers: [{provide: WeatherDataService, useClass: MockWeatherDataService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayWeatherForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should be initialized properly`, () => {
    expect(component.selectedLocation).toEqual('Helsinki');
    expect(component.oneWeeksForecast.length).toBe(2);
    expect(component.threeDaysForecast.length).toBe(2);
    expect(component.today).toBeDefined();
  })

  it('should be able to format XML data properly', () => {
    component.formatWeatherXmlData(MockWeatherDataService.mockXMLWeatherData);
    expect(component.threeDaysForecast).toEqual(['On August 28th 2019, 3:00:00 am the temperature will be 12.3 degrees Celcius.', 'On August 29th 2019, 3:00:00 am the temperature will be 14.3 degrees Celcius.']);
  });

  it("should call getWeatherForecastFromFMI mock", () => {
    component.getWeatherForecastFromOpenWeatherMap();
    expect(component.oneWeeksForecast).toEqual(
      [ 'Tuesday degrees Celcius min: 1.23 max: 32.1', 'Wednesday degrees Celcius min: 12.3 max: 32.1' ]
    );
  })

  it("should call getWeatherForecastFromFMI mock", () => {
    component.selectedLocation = "Turku";
    component.getWeatherForecastFromFMI();
    expect(component.threeDaysForecast).toEqual(
      [ 'On August 28th 2019, 3:00:00 am the temperature will be 12.3 degrees Celcius.', 'On August 29th 2019, 3:00:00 am the temperature will be 14.3 degrees Celcius.' ]
    );
  })
});
