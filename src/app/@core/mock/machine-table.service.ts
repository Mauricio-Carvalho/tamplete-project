import { Injectable } from '@angular/core';
import { MachineTableData } from '../data/machine-table';

@Injectable()
export class MachineTableService extends MachineTableData {

  data = [
    {
      idMac: 'F3B930F8',
      name: '6211',
      status: 'Ativo',
    },
    {
      idMac: 'A1B2C3D4',
      name: '8000',
      status: 'Inativo',
    },
    {
      idMac: 'E5F6G7H8',
      name: '3500',
      status: 'Manutenção',
    },
    {
      idMac: 'I9J0K1L2',
      name: '4500',
      status: 'Ativo',
    },
    {
      idMac: 'M3N4O5P6',
      name: '9000',
      status: 'Ativo',
    },
    {
      idMac: 'Q7R8S9T0',
      name: '5000',
      status: 'Inativo',
    },
    {
      idMac: 'U1V2W3X4',
      name: '6200',
      status: 'Ativo',
    },
    {
      idMac: 'Y5Z6A7B8',
      name: '3300',
      status: 'Manutenção',
    },
    {
      idMac: 'C9D0E1F2',
      name: '5500',
      status: 'Ativo',
    },
    {
      idMac: 'G3H4I5J6',
      name: '7700',
      status: 'Inativo',
    },
    {
      idMac: 'K7L8M9N0',
      name: '8800',
      status: 'Manutenção',
    },
    {
      idMac: 'O1P2Q3R4',
      name: '4400',
      status: 'Ativo',
    },
    {
      idMac: 'S5T6U7V8',
      name: '6000',
      status: 'Ativo',
    },
    {
      idMac: 'W9X0Y1Z2',
      name: '7500',
      status: 'Inativo',
    },
    {
      idMac: 'A3B4C5D6',
      name: '6700',
      status: 'Manutenção',
    },
    {
      idMac: 'E7F8G9H0',
      name: '8000',
      status: 'Ativo',
    },
    {
      idMac: 'I1J2K3L4',
      name: '3900',
      status: 'Inativo',
    },
    {
      idMac: 'M5N6O7P8',
      name: '5200',
      status: 'Manutenção',
    },
    {
      idMac: 'Q9R0S1T2',
      name: '8800',
      status: 'Ativo',
    },
    {
      idMac: 'U3V4W5X6',
      name: '4100',
      status: 'Ativo',
    },
    {
      idMac: 'Y7Z8A9B0',
      name: '6300',
      status: 'Inativo',
    },
  ];


  getData() {
    return this.data;
  }
}
