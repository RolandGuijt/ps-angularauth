import { Injectable } from '@angular/core';
import { UserClaim } from '../types/userClaim';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private roleClaim: string = '';
  nameClaim: string = '';
  authenticated: boolean = false;
  userClaims$: Observable<UserClaim[]> = new Observable<UserClaim[]>();

  constructor(private http: HttpClient) {}

  getUserClaims() {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-CSRF': '1',
      }),
    };
    this.userClaims$ = this.http.get<UserClaim[]>(
      '/account/user?slide=false',
      httpOptions
    );
    this.userClaims$.subscribe((c) => {
      let name = c.find((claim) => claim.type === 'name');
      this.nameClaim = name ? name.value : '';

      let role = c.find((claim) => claim.type === 'role');
      this.roleClaim = role ? role.value : '';

      this.authenticated = c.length > 0;
    });
  }

  canSeeHouseDetails() {
    return this.roleClaim === 'Admin';
  }

  canAddHouse() {
    return this.roleClaim === 'Contributor';
  }
}
