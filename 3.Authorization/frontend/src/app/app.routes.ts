import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { HouseListComponent } from './components/house-list/house-list.component';
import { HouseComponent } from './components/house/house.component';
import { inject } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';

export const routes: Routes = [
  { path: '', component: HouseListComponent },
  {
    path: 'house/:id',
    component: HouseComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        inject(AuthorizationService).canSeeHouseDetails(),
    ],
  },
];
