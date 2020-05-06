import {Component, OnInit} from '@angular/core';
import {BroadcastService, MsalService} from "@azure/msal-angular";

@Component({
  selector: 'app-root',
  template: `
    <h1>
      Welcome to {{title}}!
    </h1>
    <h2 *ngIf="name">User: {{name}}</h2>
    <pre *ngIf="name">{{authService.getAccount() | json}}</pre>
    <ul>
      <li>
        <a [routerLink]="['']">Home page</a>
      </li>
      <li>
        <a [routerLink]="['test']">Test page</a>
      </li>
      <li>
        <a [routerLink]="['private']">Private page (login if you want to see it!)</a>
      </li>
      <li>
        <button (click)="login()" *ngIf="!isAuth">Login</button>
        <button (click)="logout()" *ngIf="isAuth">Logout</button>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  title = 'angular-with-msaljs';
  isAuth = false;
  name: string;

  constructor(private broadcastService: BroadcastService, public authService: MsalService) {
  }

  ngOnInit(): void {

    this.checkoutAccount();

    this.broadcastService.subscribe("msal:loginFailure", payload => {
      console.log('loginFailure', payload)
      this.checkoutAccount();
    });

    this.broadcastService.subscribe("msal:loginSuccess", payload => {
      console.log('loginSuccess', payload)
      this.checkoutAccount();
    });

    this.broadcastService.subscribe("msal:acquireTokenSuccess", payload => {
      console.log('acquireTokenSuccess', payload)
      this.checkoutAccount();
    });

    this.broadcastService.subscribe("msal:acquireTokenFailure", payload => {
      console.log('acquireTokenFailure', payload)
      this.checkoutAccount();
    });
    this.broadcastService.subscribe("msal:ssoSuccess", payload => {
      console.log('ssoSuccess', payload)
      this.checkoutAccount();
    });

    this.broadcastService.subscribe("msal:ssoFailure", payload => {
      console.log('ssoFailure', payload)
      this.checkoutAccount();
    });

    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }
      console.log('Redirect Success: ', response);
      this.checkoutAccount();
    });
  }

  checkoutAccount() {
    this.isAuth = !!this.authService.getAccount();
    this.name = this.authService.getAccount()?.name;
  }

  login() {
    // this.authService.loginRedirect()
    this.authService.loginPopup()
  }

  logout() {
    this.authService.logout()
  }
}
