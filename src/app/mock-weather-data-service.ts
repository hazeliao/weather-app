import { Observable, of } from 'rxjs';

export class MockWeatherDataService {
    place: string = "Helsinki";
    static mockXMLWeatherData: string = `<xml>
                                        <BsWfs:ParameterValue>12.3</BsWfs:ParameterValue>
                                        <BsWfs:Time>2019-08-28T00:00:00Z</BsWfs:Time>
                                        <BsWfs:ParameterValue>14.3</BsWfs:ParameterValue>
                                        <BsWfs:Time>2019-08-29T00:00:00Z</BsWfs:Time>
                                        </xml>`;
    setPlace(arg: string): void { this.place = arg; };
    getWeatherForecastForTheNext50hours(): Observable<string> { return of(MockWeatherDataService.mockXMLWeatherData); }
    getCurrentWeeksWeather(): Observable<any> {
        let fakeResults = {
            list: [
                {
                    dt_txt: "2019-08-27 00:00:00",
                    main: {
                        temp_max: 12.3,
                        temp_min: 1.23
                    }
                },
                {
                    dt_txt: "2019-08-27 06:00:00",
                    main: {
                        temp_max: 32.1,
                        temp_min: 3.21
                    }
                },
                {
                    dt_txt: "2019-08-28 00:00:00",
                    main: {
                        temp_max: 3.21,
                        temp_min: 32.1
                    }
                },
                {
                    dt_txt: "2019-08-28 06:00:00",
                    main: {
                        temp_max: 32.1,
                        temp_min: 12.3
                    }
                }
            ]
        }
        return of(fakeResults);
    }
}
