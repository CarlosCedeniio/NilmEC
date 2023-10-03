import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Value {
  sensedAt: any;
  data: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})



export class ElectricDataService {

  apiUrl = 'http://200.126.14.233:8000/getSpecificData?id=64ad81a0dc5442c4e0796382&start=26/09/2023&end=27/09/2023&type=energia_A';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Value[]> {
    return this.http.get<Value[]>(this.apiUrl);
   }
}
