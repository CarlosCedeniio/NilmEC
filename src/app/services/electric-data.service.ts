import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';


interface Value {
  sensedAt: any;
  data: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})



export class ElectricDataService {

  apiUrl = 'https://aias.espol.edu.ec/api/hayiot';
  specificData = '/getSpecificData';
  alldata = '/getData';
  lastData = '/getLastData';
  groupOf = '/getDataWeb';
  main_id = '64ad81a0dc5442c4e0796382';
  actualBill = 'https://smartx.espol.edu.ec/nilmecapi/getConsumptionBill';
  forecastedBill = 'https://smartx.espol.edu.ec/nilmecapi/getForecast';
  pastMonths = 'https://smartx.espol.edu.ec/nilmecapi/getPastMonthsBills';

  //forecastedBill = 'http://localhost:5011/getForecast';
  constructor(private http: HttpClient) { }

  urlMaker(requestType : string, sensorID: string='', startDate : string='', endDate : string='', variable: string = ''){
    switch (requestType){
      case 'specific':
        return this.apiUrl + this.specificData + '?id=' + sensorID + '&start=' + startDate + '&end=' + endDate + '&type='+variable;
      case 'all':
        return this.apiUrl + this.alldata + '?id=' + sensorID + '&start=' + startDate + '&end=' + endDate;
      case 'groupOf':
          return this.apiUrl + this.groupOf;
      case 'last':
        return this.apiUrl + this.lastData;
      case 'actualBill':
        return this.actualBill;
      case 'forecastedBill':
        return this.forecastedBill;
      case 'pastMonths':
        return this.pastMonths;
    }
  }

  getAllPosts(): Observable<Value[]> {
    const today = moment().add(-1,'days').format('DD/MM/YYYY 05:00:00');
    const tomorrow = moment().add(1, 'days').format('DD/MM/YYYY 05:00:00');
    let request = this.urlMaker('specific', this.main_id, today, tomorrow, 'potencia_A' )
    return this.http.get<Value[]>(request);
   }

  getAllInstantConsumption(): Observable<Value[]> {
    let body = {
      id: this.main_id,
      tags: ['potencia_A', 'potencia_B', 'potencia_C']
    }
    let request = this.urlMaker('last')
    return this.http.post<Value[]>(request, body);
   }


   getInstantParameters(): Observable<Value[]> {
    let body = {
      id: this.main_id,
      tags: ['voltaje_A', 'voltaje_B', 'voltaje_C', 'corriente_A', 'corriente_B', 'corriente_C']
    }
    let request = this.urlMaker('last')
    return this.http.post<Value[]>(request, body);
   }

   getGroupOf(): Observable<Value[]> {
    const today = moment().add(-1,'days').format('DD/MM/YYYY 05:00:00');
    const tomorrow = moment().add(1, 'days').format('DD/MM/YYYY 05:00:00');
    let body = {
      id: this.main_id,
      start: today,
      end: tomorrow,
      tags: ['potencia_A', 'potencia_B', 'potencia_C']
    }
    let request = this.urlMaker('groupOf')
    return this.http.post<Value[]>(request, body);
   }

   getActualBill(): Observable<Value[]> {
    let request = this.urlMaker('actualBill')
    return this.http.get<Value[]>(request);
   }

   getForecastedBill(): Observable<Value[]> {
    let request = this.urlMaker('forecastedBill')
    return this.http.get<Value[]>(request);
   }

   getPastMonths(): Observable<Value[]> {
    let request = this.urlMaker('pastMonths')
    return this.http.get<Value[]>(request);
   }

}
