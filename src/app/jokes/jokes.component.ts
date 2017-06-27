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
      public newComment: string = '';

      constructor(private activatedRoute: ActivatedRoute,
            private jokesService: JokesService,
            private config: AppConfig,
            private alertService: AlertService, ) {

      }

      ngOnInit() {
            this.activatedRoute.params.subscribe((params: Params) => {
                  this.userName = params['PostedBy'];
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
                        this.getAllJokes();
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
      addComment(event, jokeId: number) {
            var newComment = "";
            newComment = event.target.value;
            if (newComment.trim() != "") {
                  var comment: any = { PostedBy: localStorage.getItem(this.config.UserName), Content: newComment };

                  this.jokesService.
                        addComment(comment, jokeId).
                        subscribe(
                        result => {
                              this.getAllJokes();
                        },
                        error => {
                              this.alertService.error(error.json().error_description);
                        });
                  newComment = "";
                  event.target.value = "";
            }
      }



      // to work on this
      timeSince(date: Date) {

            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            var diff = new Date().getTime() - date.getTime();
            var seconds = Math.floor(diff / 1000);

            var interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                  return interval + " years";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                  return interval + " months";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                  return interval + " days";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                  return interval + " hours";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                  return interval + " minutes";
            }
            return Math.floor(seconds) + " seconds";
      }


}
