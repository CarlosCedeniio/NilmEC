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
  main_id = '64ad81a0dc5442c4e0796382'

  constructor(private http: HttpClient) { }

  urlMaker(requestType : string, sensorID: string='', startDate : string='', endDate : string='', variable: string = ''){
    switch (requestType){
      case 'specific':
        return this.apiUrl + this.specificData + '?id=' + sensorID + '&start=' + startDate + '&end=' + endDate + '&type='+variable;
      case 'all':
        return this.apiUrl + this.alldata + '?id=' + sensorID + '&start=' + startDate + '&end=' + endDate;
      case 'groupOf':
          return this.apiUrl + this.groupOf
      case 'last':
        return this.apiUrl + this.lastData
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

}
