import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TestComponent} from './components/test/test.component';
import {AuthComponent} from './components/auth/auth.component';
import {MsalInterceptor, MsalModule} from "@azure/msal-angular";
import {PrivateComponent} from './components/private-component/private.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AuthComponent,
    PrivateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot({
      auth: {
        clientId: "{Application (client) ID}",
        authority: "https://login.microsoftonline.com/{Directory (tenant) ID}",
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
