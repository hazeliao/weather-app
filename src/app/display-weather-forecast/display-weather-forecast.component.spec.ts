import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWeatherForecastComponent } from './display-weather-forecast.component';

describe('DisplayWeatherForecastComponent', () => {
  let component: DisplayWeatherForecastComponent;
  let fixture: ComponentFixture<DisplayWeatherForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayWeatherForecastComponent ]
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
});
