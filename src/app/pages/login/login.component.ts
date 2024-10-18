import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  private router = inject(Router);

  ngOnInit(): void {
    // Dynamically load Google API script
    this.addGoogleScript();
  }

  ngAfterViewInit(): void {
    // Wait for the Google script to load before initializing
    const scriptElement = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );

    if (scriptElement) {
      scriptElement.addEventListener('load', () => {
        this.initializeGoogleLogin();
      });
    }
  }

  private addGoogleScript() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  private initializeGoogleLogin() {
    google.accounts.id.initialize({
      client_id: environment.clientID,
      callback: (resp: any) => {
        console.log(resp);
        this.handleLogin(resp);
      },
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 250,
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
      this.router.navigate(['browse']);
    }
  }
}
