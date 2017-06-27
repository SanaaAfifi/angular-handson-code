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
        let url = this.JokesServiceUrl;
        return this.httpService.get(url + '/GetByUser/' + UserID, this.jwt()).
            map(response => response.json()).do(data => JSON.stringify(data));
    }

    hide(jokeId: number): Observable<any> {
        let url = this.JokesServiceUrl + '/Hide/' + jokeId;
        return this.httpService.post(url, this.jwt()).
            map(response => response.json()).do(data => JSON.stringify(data));
    }


    addNewJoke(joke: any): Observable<any> {
        let body = joke;
        let url = this.JokesServiceUrl;
        return this.httpService.post(url, body, this.jwt()).
            map(
                response => response.json()
                ).do(
                    data => JSON.stringify(data)
                    );
    }
    addComment(comment: any,jokeId: number): Observable<any> {
        let body = comment;
        let url = this.JokesServiceUrl+'/PostComment/'+jokeId;
        return this.httpService.post(url, body, this.jwt()).
            map(
                response => response.json()
                ).do(
                    data => JSON.stringify(data)
                    );
    }

    vote(jokeId: number, up: boolean): Observable<any> {
        let url = this.JokesServiceUrl+ '/Vote/' + jokeId + '/' + up+ '/' + localStorage.getItem(this.config.UserName) ;
        return this.httpService.put(url , this.jwt()).
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
