import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AppConfig } from '../app.config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _http: Http,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private config : AppConfig) { }

  ngOnInit() {
    // reset login status
   // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
if(this.config.TokenKey)
    this.router.navigate(['home']);
  }

  login() {
    this.authenticationService.loging(this.model.username, this.model.password).
      then(
      response => {
        localStorage.setItem(this.config.Accesstoken, response.json().access_token);
        localStorage.setItem(this.config.Expiresin, response.json().expires_in);
        localStorage.setItem(this.config.TokenType, response.json().token_type);
        localStorage.setItem(this.config.UserName, response.json().userName);
        localStorage.setItem(this.config.TokenKey,response.json());
        this.router.navigate(['home']);
      },
      error => {
        this.alertService.error(error.json().error_description);
        this.loading = false;
      });


  }
}
