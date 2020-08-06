import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from './defaultPage/default.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ListeClasseComponent} from './adminBack/liste-classe/liste-classe.component';
import {ClasseComponent} from './adminBack/classe/classe.component';
import {ElevesComponent} from './students/eleves/eleves.component';
import {PersonnelsComponent} from './personnels/personnels/personnels.component';
import {CaisseComponent} from './tresorerie/caisse/caisse.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
      path: 'dashboard',
      component: DashboardComponent
      },
      {
        path: 'admin',
        component: DashboardComponent
      },
      {
        path: 'manage-personnel',
        component: PersonnelsComponent
      },
      {
        path: 'manage-classes-matieres',
        component: ListeClasseComponent
      },
      {
        path: 'manage-mark',
        component: DashboardComponent
      },
      {
        path: 'manage-caisse',
        component: CaisseComponent
      },
      {
        path: 'manage-cours',
        component: DashboardComponent
      },
      {
        path: 'manage-students',
        component: ElevesComponent
      },
    ]
  },
  {
    path: 'xxxx',
    component: ClasseComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
