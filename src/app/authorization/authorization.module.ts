import { NgModule } from '@angular/core';
import { AuthorizationComponent } from './authorization.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {SharedModule} from '../shared/shared.module';
import {AuthorizationRoutingModule} from './authorization-routing.module';
import {AuthGuard} from '../shared/guards/auth-guard';

@NgModule({
  declarations: [
    AuthorizationComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    SharedModule,
    AuthorizationRoutingModule
  ],
  providers: [AuthGuard]
})
export class AuthorizationModule {}
