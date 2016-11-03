import { Component,enableProdMode, OnInit } from '@angular/core';

//enableProdMode();

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {


  private title = 'Branding';

  localStorage = localStorage;

  constructor(){}

  ngOnInit(){
    document.title = this.title;
  }

}