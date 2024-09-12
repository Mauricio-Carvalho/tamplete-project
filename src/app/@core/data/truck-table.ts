import {Observable} from 'rxjs';

export abstract class TruckTableData {

  // Método para obter os dados da tabela
  abstract getData(): Observable<any[]>;

  // Método para criar um novo registro
  abstract createData(newTruckData: any): Observable<any>;

  // Método para editar um registro existente
  abstract updateData(id: string, updatedTruckData: any): Observable<any>;

  // Método para deletar um registro
  abstract deleteData(id: string): Observable<void>;
}
