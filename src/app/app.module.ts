import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ImageUploadModule } from 'angular2-image-upload';
import { AppComponent } from './app.component';
import { JokesComponent } from './jokes/jokes.component';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { AppConfig } from './app.config';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component'; 
import { AuthGuard } from './guards/auth.guard';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    JokesComponent,
    HomeComponent,
    AlertComponent,
    RegisterComponent,
    LoginComponent,
    UserprofileComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ImageUploadModule.forRoot(),
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [
    AppConfig,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
