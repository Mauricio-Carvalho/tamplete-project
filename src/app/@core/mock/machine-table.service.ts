import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MachineTableData } from '../data/machine-table';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MachineTableService extends MachineTableData {

  private readonly apiUrl = environment.baseUrl + '/v1/machine';

  constructor(private http: HttpClient) {
    super();
  }

  // Busca todos os dados (Read)
  getData(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.content));
  }

  // Cria um novo registro (Create)
  createData(newMachineData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newMachineData);
  }

  // Atualiza um registro existente (Edit)
  updateData(id: string, updatedMachineData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedMachineData);
  }

  // Remove um registro (Delete)
  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
