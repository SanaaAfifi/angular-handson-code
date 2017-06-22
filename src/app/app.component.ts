import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { AppConfig } from './app.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private config : AppConfig) {}
logout ()
{
   this.authenticationService.logout();
   this.router.navigate(['login']);
}
}

