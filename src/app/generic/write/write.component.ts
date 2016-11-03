import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { GenericService } from '../generic.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class GenericWriteComponent implements OnInit {

  model: string;
  modelsub: any;

  sub: any;
  object: any;
  formSchema: any = {};
  objectModel: any = {};
  showForm: boolean = false;
  error: any;
  success: boolean = false;
  
  constructor(
    private route: ActivatedRoute, 
    private genericService: GenericService, 
    private router: Router
  ) { }

  ngOnInit() {

    let params = this.route.snapshot.params;

    // if there is no ID...then we are going to create a new one...
    if (typeof params['model'] == 'undefined') return;

    // observe the route param values...
    this.sub = this.route.params.subscribe(params => {
      let model = typeof params['model'] == 'undefined' ? '' : params['model'];
      let id = typeof params['id'] == 'undefined' || params['id'] == 'create' ? '' : params['id'];
      this.loadSchema(model,id);
    });

  }

  ngOnDestroy() {
    if (typeof this.sub == 'undefined') return;
    this.sub.unsubscribe();
  }

  formActions: any = {
    save: (property) => {
      this.sub = this.genericService.save(property.value).subscribe(
        (r: Response) => { 
          this.objectModel = r.json(); 
          this.success = true;
          setTimeout(e => this.success = false, 2000); 
          this.error = null; 
          this.sub.unsubscribe();
        }, (e: any) => { 
          this.error = e._body; 
          this.success = false; 
          setTimeout(e => this.error = null, 5000); 
          this.sub.unsubscribe();
        });
    },
  }

  loadSchema(model: string, id: string = ''){

    let self = this;

    this.model = model;
    
    this.modelsub = this.genericService.selectModel(this.model).subscribe(
      response => {
        if (!response) self.router.navigate(["/404"]);

        if (id != ''){
          this.genericService.get(id).subscribe(p => {
            this.objectModel = p.json();
            this.formSchema = this.genericService.generateFormSchema(this.objectModel);
            console.log(this.formSchema);
            this.showForm = true;
          });
        } else{
          this.formSchema = this.genericService.generateFormSchema();
          this.showForm = true;
        } 
      }, e => {
        self.router.navigate(["/404"]);
      });
  }

}
