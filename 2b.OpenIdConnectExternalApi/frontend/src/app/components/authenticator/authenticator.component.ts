import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserClaim } from '../../types/userClaim';

@Component({
  selector: 'app-authenticator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authenticator.component.html',
  styleUrl: './authenticator.component.css',
})
export class AuthenticatorComponent implements OnInit {
  nameClaim: string = '';
  authenticated: boolean = false;
  userClaims$: Observable<UserClaim[]> = new Observable<UserClaim[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserClaims();
    this.userClaims$.subscribe((c) => {
      let claim = c.find((claim) => claim.type === 'name');
      this.nameClaim = claim ? claim.value : '';
      this.authenticated = c.length > 0;
    });
  }

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
  }
}
