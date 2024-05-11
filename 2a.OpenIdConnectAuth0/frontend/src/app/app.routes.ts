import { Routes } from '@angular/router';
import { HouseListComponent } from './components/house-list/house-list.component';
import { HouseComponent } from './components/house/house.component';

export const routes: Routes = [
  { path: '', component: HouseListComponent },
  { path: 'house/:id', component: HouseComponent },
];
