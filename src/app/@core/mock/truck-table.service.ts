import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TruckTableData } from '../data/truck-table';
import { environment } from '../../../environments/environment';

@Injectable()
export class TruckTableService extends TruckTableData {

  private readonly apiUrl = environment.baseUrl + '/truck';

  constructor(private http: HttpClient) {
    super();
  }

  // Busca todos os dados (Read)
  getData(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.content));
  }

  // Cria um novo registro (Create)
  createData(newTruckData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newTruckData);
  }

  // Atualiza um registro existente (Edit)
  updateData(id: string, updatedTruckData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedTruckData);
  }

  // Remove um registro (Delete)
  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
