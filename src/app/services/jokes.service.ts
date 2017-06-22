import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import { AppConfig } from '../app.config';

@Injectable()
export class JokesService {
    JokesServiceUrl;
    AccountServiceUrl;
    constructor(
        private httpService: Http, private config: AppConfig) {
        this.JokesServiceUrl = config.JokesServiceUrl;
    }
    getAllJokes(): Observable<any> {
        var headers = new Headers();
        let url = this.JokesServiceUrl;
        return this.httpService.get(url, this.jwt()).
            map(
            response => response.json()
            ).do(
            data =>
                JSON.stringify(data)
            );
    }

    getByUserID(UserID: string): Observable<any> {
        var headers = new Headers();
        let url = this.JokesServiceUrl;
        return this.httpService.get(url + '/GetByUser/' + UserID, this.jwt()).
            map(response => response.json()).do(data => JSON.stringify(data));
    }

    hide(jokeID: number): Observable<any> {
        var headers = new Headers();
        let url = this.JokesServiceUrl;
        return this.httpService.post(url + '/Hide/' + jokeID, this.jwt()).
            map(response => response.json()).do(data => JSON.stringify(data));
    }


    addNewJoke(joke: any): Observable<any> {
        var headers = new Headers();
        let body = joke;
        let url = this.JokesServiceUrl;
        return this.httpService.post(url, body, this.jwt()).
            map(
                response => response.json()
                ).do(
                    data => JSON.stringify(data)
                    );
    }

    vote(jokeId: number, up: boolean): Observable<any> {
        var headers = new Headers();
        let url = this.JokesServiceUrl;
        return this.httpService.put(url + '/Vote/' + jokeId + '/' + up+ '/' + localStorage.getItem(this.config.UserName) , this.jwt()).
            map(response => response.json()).do(data => JSON.stringify(data));
    }
    private jwt() {
        // create authorization header with jwt token
        let token = localStorage.getItem(this.config.Accesstoken);
        if (token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            return new RequestOptions({ headers: headers });
        }
    }

}
