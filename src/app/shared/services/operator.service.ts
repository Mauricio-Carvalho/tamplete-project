
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

  url = environment.baseUrl + '/v1/operator';

  getOperators(): Observable<any> {
    let params = new HttpParams();
    params = params
              .set('status', 'ACTIVE')
              .set('size', 1000);
    return this.http.get(this.url, { params });
  }

}
