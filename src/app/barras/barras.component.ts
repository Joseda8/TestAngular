import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styleUrls: ['./barras.component.css']
})
export class BarrasComponent implements OnInit {

  private urlapi = 'https://api-sensor.herokuapp.com/hello/w';
  //private urlapi = 'http://localhost:8080/REST_test/hello/w';
  public enviroment_temp: any = null;

  public barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: { enabled: false },
    scales: { xAxes: [{}], yAxes: [{scaleLabel: {
      display: true,
      labelString: '°C'
    }, ticks: { 
        min : 0,
        //stepSize : 5 
      }, 
  }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Temperatura'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [0], label: 'Ambiente' },
    { data: [0], label: 'Objeto' }
  ];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    setInterval(this.getTemperature.bind(this), 500);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public getTemperature() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.urlapi}?symbols=${currencies}`;
    
    this.httpClient
      .get(url, {responseType: 'json'})
      .subscribe(apiData => (this.enviroment_temp = apiData));
      this.barChartData[0].data = [this.enviroment_temp['enviroment']];
      this.barChartData[1].data = [this.enviroment_temp['object']];
  }
}
