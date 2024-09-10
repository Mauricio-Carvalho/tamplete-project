import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OperatorTableData } from '../data/operator-table';
import { environment } from '../../../environments/environment';

@Injectable()
export class OperatorTableService extends OperatorTableData {

  private readonly apiUrl = environment.baseUrl + '/operator';

  constructor(private http: HttpClient) {
    super();
  }

  // Busca todos os dados (Read)
  getData(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.content));
  }

  // Cria um novo registro (Create)
  createData(newOperatorData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newOperatorData);
  }

  // Atualiza um registro existente (Edit)
  updateData(id: string, updatedOperatorData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedOperatorData);
  }

  // Remove um registro (Delete)
  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
