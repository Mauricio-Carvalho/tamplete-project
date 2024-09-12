import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RefuelTableData } from '../data/refuel-table';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RefuelTableService extends RefuelTableData {

  private readonly apiUrl = environment.baseUrl + '/refuel';

  constructor(private http: HttpClient) {
    super();
  }

  // Busca todos os dados (Read)
  getData(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.content));
  }

  // Cria um novo registro (Create)
  createData(newRefuelData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newRefuelData);
  }

  // Atualiza um registro existente (Edit)
  updateData(id: string, updatedRefuelData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedRefuelData);
  }

  // Remove um registro (Delete)
  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
