import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { HttpClient } from '../shared/services/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  private models: string[];
  private sub: any;

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(){
    this.setupDynamicMenu();
  }


  setupDynamicMenu(){
    this.http.get("/schema/available_models").subscribe(
      (r: Response) => {
        this.models = r.json();
      }
    );
  }

}