import { Observable } from 'rxjs';

export abstract class UserTableData {

  // Método para obter um usuário específico
  abstract getUserById(id: string): Observable<any>;

  // Método para obter os dados da tabela
  abstract getData(): Observable<any[]>;

  // Método para criar um novo registro
  abstract createData(newUserData: any): Observable<any>;

  // Método para editar um registro existente
  abstract updateData(id: string, updatedUserData: any): Observable<any>;

  // Método para deletar um registro
  abstract deleteData(id: string): Observable<void>;
}
