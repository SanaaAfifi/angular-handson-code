import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../app.config';
@Injectable()
export class UserService {

  constructor(private httpService: Http, private config: AppConfig) { }
   register(user: any) {
      var result;
       var headers = new Headers();
         let body = user;
        let url = this.config.AccountServiceUrl;
         this.httpService.post(this.config.AccountServiceUrl+'/Register/',body, { headers: headers})
        .subscribe(
        response => {
          localStorage.setItem(this.config.TokenKey, response.json().id_token);
         result = "";
        },
        error => {
         result =  error.text;
        }
      );   
      return result;
    }
     create(user: any) {
        return this.httpService.post(this.config.AccountServiceUrl+'/Register/', user, this.jwt());
    }
     private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem(this.config.TokenKey));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
  }

  