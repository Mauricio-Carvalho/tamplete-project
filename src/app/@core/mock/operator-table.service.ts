import { Injectable } from '@angular/core';
import { OperatorTableData } from '../data/operator-table';

@Injectable()
export class OperatorTableService extends OperatorTableData {

  data = [
    {
      idOp: 'C3DB4512',
      name: 'WELLTON',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4513',
      name: 'JULIANO',
      status: 'Inativo',
    },
    {
      idOp: 'C3DB4514',
      name: 'MARIA',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4515',
      name: 'JOÃO',
      status: 'Inativo',
    },
    {
      idOp: 'C3DB4516',
      name: 'ANA',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4517',
      name: 'CARLOS',
      status: 'Inativo',
    },
    {
      idOp: 'C3DB4518',
      name: 'PAULO',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4519',
      name: 'FABIOLA',
      status: 'Inativo',
    },
    {
      idOp: 'C3DB4520',
      name: 'FERNANDO',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4521',
      name: 'PATRICIA',
      status: 'Inativo',
    },
    {
      idOp: 'C3DB4522',
      name: 'LUCAS',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4523',
      name: 'SILVIA',
      status: 'Inativo',
    },
    {
      idOp: 'C3DB4524',
      name: 'RICARDO',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4525',
      name: 'GABRIELA',
      status: 'Inativo',
    },
    {
      idOp: 'C3DB4526',
      name: 'TATIANA',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4527',
      name: 'ANDRÉ',
      status: 'Inativo',
    },
    {
      idOp: 'C3DB4528',
      name: 'ISABELA',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4529',
      name: 'BRUNO',
      status: 'Inativo',
    },
    {
      idOp: 'C3DB4530',
      name: 'MARTA',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4531',
      name: 'CAMILA',
      status: 'Inativo',
    },
    {
      idOp: 'C3DB4532',
      name: 'SÉRGIO',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4533',
      name: 'KÁTIA',
      status: 'Inativo',
    },
    {
      idOp: 'C3DB4534',
      name: 'VALÉRIA',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4535',
      name: 'RENATO',
      status: 'Inativo',
    },
    {
      idOp: 'C3DB4536',
      name: 'ALEX',
      status: 'Ativo',
    },
    {
      idOp: 'C3DB4537',
      name: 'GUSTAVO',
      status: 'Inativo',
    },
  ];

  getData() {
    return this.data;
  }
}
