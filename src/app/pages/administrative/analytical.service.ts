
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TruckFuelData } from '../../shared/model/truckFuelData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticalService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  url = environment.baseUrl + '/v1/analytics/';

  countOperator(): Promise<Object> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    let url = this.url + 'operator/count-operator';

    return this.http.get(url, { headers }).toPromise();
  }

  countMachine(): Promise<Object> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    let url = this.url + 'machine/count-machine';

    return this.http.get(url, { headers }).toPromise();
  }

  countFuel(): Promise<Object> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    let url = this.url + 'fuel-all';

    return this.http.get(url, { headers }).toPromise();
  }

  getTruckFuelData(): Observable<TruckFuelData[]> {
    let url = this.url + 'trucks/fuel-percentage';

    return this.http.get<TruckFuelData[]>(url);
  }

  getFuelByOperators(year: number, month: number, operators: string[] ): Observable<any> {
    let url =  this.url + `fuel/operators?year=${year}&month=${month}`;
    if(operators != null && operators.length > 0)
      url =  this.url + `fuel/operators?year=${year}&month=${month}&operators=${operators}`;

    return this.http.get(url);
  }

  getFuelByMachines(year: number, month: number, nameMacs: string[] ): Observable<any> {
    let url =  this.url + `fuel/machines?year=${year}&month=${month}`;
    if(nameMacs != null && nameMacs.length > 0)
      url =  this.url + `fuel/machines?year=${year}&month=${month}&nameMac=${nameMacs}`;

    return this.http.get(url);
  }

}
