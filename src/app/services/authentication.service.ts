import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private config: AppConfig) { }

    async loging(username: string, password: string): Promise<any> {
        const response = await this.http.post(this.config.apiUrl +
            '/Token', "username=" + username + "&password=" + password + "&grant_type=password").toPromise();
        let user = response.json();
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(this.config.TokenKey, JSON.stringify(user));
        }
        return response;
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(this.config.TokenKey);
    }

}