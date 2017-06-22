import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { JokesService } from '../services/jokes.service'
import { AppConfig } from '../app.config';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService } from '../services/alert.service';


@Component({
      selector: 'app-jokes',
      templateUrl: './jokes.component.html',
      styleUrls: ['./jokes.component.css'],
      providers: [JokesService]
})
export class JokesComponent implements OnInit {

      public JokesList = [];
      id: number;
      showpost: boolean;
      userName: string;

      public newJoke: string = '';

      constructor(private activatedRoute: ActivatedRoute,
       private jokesService: JokesService, 
      private config: AppConfig,
      private alertService: AlertService,) {

      }

      ngOnInit() {
            this.activatedRoute.params.subscribe((params: Params) => {
                  this.userName = params['PostedBy'];
                  console.log(this.userName);
            });
            this.getAllJokes();
      }
      getAllJokes() {
            if (this.userName) {
                  this.jokesService.
                        getByUserID(this.userName).subscribe(result => {
                              this.JokesList = result
                        });
            }
            else {
                  this.jokesService.
                        getAllJokes().subscribe(result => {
                              this.JokesList = result
                        });

            }
      }
      PostNewJoke() {
            var joke: any = { PostedBy: localStorage.getItem(this.config.UserName), Content: this.newJoke };

            this.jokesService.
                  addNewJoke(joke).
                  subscribe(
                  result => { 
                        this.JokesList.unshift(result);
                   },
                  error => {
                        this.alertService.error(error.json().error_description);
                  });

            

            this.newJoke = '';
      }

      VoteUp(up: boolean, jokeId: number, index: number) {

            this.jokesService.
                  vote(jokeId, up).subscribe(result => {
                        if (up)
                              this.JokesList[index].UpVotes++;
                        else this.JokesList[index].DownVotes++;
                  });
      }

      Hide(jokeId: number, index: number) {
            this.jokesService.
                  hide(jokeId).subscribe(result => { this.JokesList.splice(index, 1) });
      }

}
