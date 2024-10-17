import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserTableData } from '../data/user-table';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserTableService extends UserTableData {

  private readonly apiUrl = environment.baseUrl + '/v1/user';

  constructor(private http: HttpClient) {
    super();
  }

  // Busca um usuário específico pelo ID
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Busca todos os dados (Read)
  getData(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.content));
  }

  // Cria um novo registro (Create)
  createData(newUserData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newUserData);
  }

  // Atualiza um registro existente (Edit)
  updateData(id: string, updatedUserData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedUserData);
  }

  // Remove um registro (Delete)
  deleteData(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
