import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// components
import { TopbarComponent } from './../components/topbar/topbar.component';
import { SignupComponent } from './../../components/signup/signup.component';
import { SigninComponent } from './../../components/signin/signin.component';
import { HomepageComponent } from './../../components/homepage/homepage.component';

// services
import { AuthService } from '../services/auth.service';
import { UserService } from '..//services/user.service';

// guards
import { AuthGuard } from '../guards/auth.guard';

// interceptors
import { AuthInterceptor } from '../interceptors/auth.interceptor';



@NgModule({
  declarations: [
    HomepageComponent,
    SigninComponent,
    SignupComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    UserService,
    AuthGuard,
  ]
})
export class CoreModule { }
