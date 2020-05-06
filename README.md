# Angular with MSAL.js
This project integrates Angular with MSAL.js (Microsoft Authentication Library for JavaScript)

## Prerequisites
- NodeJS & NPM
    -  https://nodejs.org/it/download/
- Angular cli
    - `npm install -g @angular/cli`
- Register an application in Azure AD
    - https://docs.microsoft.com/en-gb/azure/active-directory/develop/quickstart-register-app

## The process I've followed
- Create Angular project (with Router module) from cli 
    - `ng new angular-with-msaljs` (`npm install` run automatically after project creation)
    - `cd angular-with-msaljs`
- Install MSAL.js library wrapper from Microsoft
    - `npm install --save @azure/msal-angular`
- Add `MSAL module` and `MSAL interceptor` to Angular app module in `app.module.ts`:
```typescript
import {MsalInterceptor, MsalModule} from "@azure/msal-angular";
@NgModule({
  ...
  imports: [
    MsalModule.forRoot(
      auth: {
        clientId: "{Application (client) ID}",
        authority: "https://login.microsoftonline.com/{Directory (tenant) ID}",
        redirectUri: "http://localhost:4200"
      }
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  ...
})
export class AppModule { }
``` 
- Secure private routes with **canActivate: [MsalGuard]** in `app-routing.module.ts`:
```typescript
import {MsalGuard} from "@azure/msal-angular";
const routes: Routes = [
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [MsalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
- Add methods to manage authentication in `app.component.ts`:
```typescript
export class AppComponent {

  constructor(private authService: MsalService) { }

  isAuthenticated(){
    return !!this.authService.getAccount();  
  }

  login() {
    this.authService.loginRedirect() // you can also use "this.authService.loginPopup()"
  }

  logout() {
    this.authService.logout()
  }
}
```
- Use MSAL `BroadcastService` to subscribe to MSAL events:
    - loginFailure
    - loginSuccess
    - acquireTokenSuccess
    - acquireTokenFailure
    - ssoSuccess
    - ssoFailure
```typescript
export class AppComponent {

  constructor(private broadcastService: BroadcastService) {

    this.broadcastService.subscribe("msal:loginFailure", payload => {
      console.log('loginFailure', payload)
    });
    
    this.broadcastService.subscribe("msal:loginSuccess", payload => {
      console.log('loginSuccess', payload)
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
  }
  
}
```

### Microsoft Authentication Library for JavaScript (MSAL.js)
General documentation: https://github.com/AzureAD/microsoft-authentication-library-for-js

Angular wrapper: https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-angular

### @azure/msal-angular
NPM documentation: https://www.npmjs.com/package/@azure/msal-angular