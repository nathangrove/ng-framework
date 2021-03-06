import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { GenericService } from '../generic.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class GenericListComponent implements OnInit {

  model: string;
  data: any = [];
  sub: any;
  modelsub: any;
  tmpsub: any;
  datasub: any;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private genericService: GenericService,
    private router: Router
  ) { }

  ngOnInit() {

    let self = this;

    // if there is no ID...then we are going to create a new one...
    if (typeof this.route.snapshot.params['model'] == 'undefined') return;

    // observe the route param values...
    this.sub = this.route.params.subscribe(params => {
      this.loadSchema(params['model']);
    });

  }

  ngOnDestroy() {
    if (typeof this.sub !== 'undefined') this.sub.unsubscribe();
    if (typeof this.modelsub !== 'undefined') this.modelsub.unsubscribe();
    if (typeof this.datasub !== 'undefined') this.datasub.unsubscribe();
    if (typeof this.tmpsub !== 'undefined') this.tmpsub.unsubscribe();
  }

  edit(line){
    this.router.navigate([this.model,line.id]);
  }

  create(line){
    this.router.navigate([this.model,'create']);
  }

  delete(line){
    let self = this;
    this.tmpsub = this.genericService.delete(line.id).subscribe(
      (r: Response) => {
        this.tmpsub.unsubscribe();
        this.genericService.get();
      },
      (e: any) => { 
        this.tmpsub.unsubscribe();
        self.error = "Error: " + e._body;
        setTimeout(e => self.error = null,3000); 
      });
  }

  loadSchema(model){

    let self = this;

    this.model = model;
    
    this.modelsub = this.genericService.selectModel(this.model).subscribe(
      response => {
        if (!response) self.router.navigate(["/404"]);

        // well we have a valid data model...let's get the data...
        this.datasub = this.genericService.get().subscribe(
          (response: Response) => {
            this.data = response.json();
          });

      }, e => {
        self.router.navigate(["/404"]);
      });
  }

}
