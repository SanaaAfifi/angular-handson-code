import { Component, OnInit } from '@angular/core';
import { JokesComponent } from '../jokes/jokes.component';
import { JokesService } from '../services/jokes.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
   providers:[JokesComponent,JokesService]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
