import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FuelTableData } from '../data/fuel-table';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FuelTableService extends FuelTableData {

  private readonly apiUrl = environment.baseUrl + '/fuel';

  constructor(private http: HttpClient) {
    super();
  }

  // Busca todos os dados (Read)
  getData(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.content));
  }

  // Cria um novo registro (Create)
  createData(newFuelData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newFuelData);
  }

  // Atualiza um registro existente (Edit)
  updateData(id: string, updatedFuelData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedFuelData);
  }

  // Remove um registro (Delete)
  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
