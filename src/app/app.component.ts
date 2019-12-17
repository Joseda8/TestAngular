import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //private urlapi = 'https://api-sensor.herokuapp.com/hello/w';
  private urlapi = '/hello/w';
  title = 'SensorApp';
  public currentEuroRates: any = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  
  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.urlapi}?symbols=${currencies}`;
    
    this.httpClient
      .get(url, {responseType: 'text'})
      .subscribe(apiData => (this.currentEuroRates = apiData));
  }

//      .subscribe(data => console.log(data))

}
