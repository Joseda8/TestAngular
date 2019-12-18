import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //private urlapi = 'https://api-sensor.herokuapp.com/hello/w';
  private urlapi = 'http://localhost:8080/REST_test/hello/w';
  //"start": "ng serve --proxy-config proxy.conf.json",

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
      .get(url, {responseType: 'json'})
      .subscribe(apiData => (this.currentEuroRates = apiData['enviroment']));
  }

//      .subscribe(data => console.log(data))

}
