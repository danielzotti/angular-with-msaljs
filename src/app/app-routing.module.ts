import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TestComponent} from "./components/test/test.component";
import {AppComponent} from "./app.component";
import {PrivateComponent} from "./components/private-component/private.component";
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
export class AppRoutingModule {
}
