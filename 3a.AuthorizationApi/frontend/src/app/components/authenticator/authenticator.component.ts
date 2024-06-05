import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-authenticator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authenticator.component.html',
  styleUrl: './authenticator.component.css',
})
export class AuthenticatorComponent implements OnInit {
  constructor(public authorizationService: AuthorizationService) {}

  ngOnInit(): void {
    this.authorizationService.getUserClaims();
  }
}
