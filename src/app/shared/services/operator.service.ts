
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { TruckFuelData } from '../../shared/model/truckFuelData';
import { Observable } from 'rxjs';
import { AuthService } from '../../pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  url = environment.baseUrl + '/v1/operator/';

  countOperator(): Promise<Object> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    let url = this.url + 'operator/count-operator';

    return this.http.get(url, { headers }).toPromise();
  }


  getOperators(): Observable<any> {
    let params = new HttpParams();
    params = params
              .set('status', 'Ativo')
              .set('size', 1000);
    return this.http.get(this.url, { params });
  }

  getFuelByOperators(year: number, month: number, operators: string[] ): Observable<any> {
    let url =  this.url + `fuel/operators?year=${year}&month=${month}`;
    if(operators != null && operators.length > 0)
      url =  this.url + `fuel/operators?year=${year}&month=${month}&operators=${operators}`;

    return this.http.get(url);
  }

}
