import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
/** Modules */
import { MaterialModule } from './material/material.module';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
/** Components */
import { AppComponent } from './app.component';
import {
  HomeComponent,
  SignupComponent,
  LoginComponent,
  ForgotComponent,
  LogoutComponent,
  AccountComponent,
  AdminComponent,
  NotFoundComponent  
} from './pages';
/** Services */
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { MessageService } from './services/message.services';


import { EqualValidator } from './directives/equal-validator.directive';  // import validator

const PAGES = [
  HomeComponent,
  SignupComponent,
  LoginComponent,
  ForgotComponent,
  LogoutComponent,
  AccountComponent,
  AdminComponent,
  NotFoundComponent  
];

@NgModule({
  declarations: [
    AppComponent,
    ...PAGES,
    EqualValidator
  ],
  imports: [
    RoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    PasswordStrengthBarModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
    MessageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
