import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { UserTableComponent } from './user-table/user-table.component';
import { FuelTableComponent } from './fuel-table/fuel-table.component';
import { OperatorTableComponent } from './operator-table/operator-table.component';
import { MachineTableComponent } from './machine-table/machine-table.component';
import { RefuelTableComponent } from './refuel-table/refuel-table.component';
import { TruckTableComponent } from './truck-table/truck-table.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'user-table',
      component: UserTableComponent,
    },
    {
      path: 'fuel-table',
      component: FuelTableComponent,
    },
    {
      path: 'refuel-table',
      component: RefuelTableComponent,
    },
    {
      path: 'operator-table',
      component: OperatorTableComponent,
    },
    {
      path: 'machine-table',
      component: MachineTableComponent,
    },
    {
      path: 'truck-table',
      component: TruckTableComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  UserTableComponent,
  FuelTableComponent,
  OperatorTableComponent,
  MachineTableComponent,
  RefuelTableComponent,
  TruckTableComponent,
];
