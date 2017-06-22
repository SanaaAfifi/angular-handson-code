import { Component, OnInit } from '@angular/core';
import { JokesComponent } from '../jokes/jokes.component';

import { JokesService } from '../services/jokes.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[JokesComponent,JokesService]
})
export class ProfileComponent implements OnInit {
  UserName : string;
  constructor(jokes: JokesComponent) { }

  ngOnInit() {
    this.UserName = "Sanaa Afifi"
  }

}
