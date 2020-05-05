import {Component, OnInit} from '@angular/core';
import {BroadcastService, MsalService} from "@azure/msal-angular";

@Component({
  selector: 'app-root',
  template: `
    <h1>
      Welcome to {{title}}!
    </h1>
    <h2 *ngIf="name">User: {{name}}</h2>
    <ul>
      <li>
        <a [routerLink]="['']">Home page</a>
      </li>
      <li>
        <a [routerLink]="['test']">Test page</a>
      </li>
      <li>
        <a [routerLink]="['private']">Private page (need authentication)</a>
      </li>
      <li>
        <button (click)="login()">Login</button>
        <button (click)="logout()">Logout</button>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  title = 'angular-with-msaljs';
  loggedIn = false;
  name: string = null;

  constructor(private broadcastService: BroadcastService, private authService: MsalService) {
  }

  ngOnInit(): void {

    this.checkoutAccount();

    this.name = this.authService.getAccount()?.name;

    this.broadcastService.subscribe("msal:loginFailure", payload => {
      console.log('loginFailure', payload)
    });

    this.broadcastService.subscribe("msal:loginSuccess", payload => {
      console.log('loginSuccess', payload)
      this.name = payload?.account?.name;
    });

    this.broadcastService.subscribe("msal:acquireTokenSuccess", payload => {
      console.log('acquireTokenSuccess', payload)
    });

    this.broadcastService.subscribe("msal:acquireTokenFailure", payload => {
      console.log('acquireTokenFailure', payload)
    });
    this.broadcastService.subscribe("msal:ssoSuccess", payload => {
      console.log('ssoSuccess', payload)
    });

    this.broadcastService.subscribe("msal:ssoFailure", payload => {
      console.log('ssoFailure', payload)
    });

    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response);
    });
  }

  checkoutAccount() {
    this.loggedIn = !!this.authService.getAccount();
  }

  login() {
    this.authService.loginRedirect()
    // this.authService.loginPopup()
  }

  logout() {
    this.authService.logout()
  }
}
