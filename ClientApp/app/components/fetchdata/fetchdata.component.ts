import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent implements OnInit {
    public forecasts: WeatherForecast[];

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    ngOnInit(): void {
        this.http.get<WeatherForecast[]>(this.baseUrl + 'api/SampleData/WeatherForecasts')
            .subscribe(result => {
                this.forecasts = result;
            }, error => console.error(error));
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
