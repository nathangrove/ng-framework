import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { WidgetRegistry } from "angular2-schema-form";
import { TinyMCEWidget } from "ng2sf-tinymce";

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
  objId: string;
  
  constructor(
    private route: ActivatedRoute, 
    private genericService: GenericService, 
    private router: Router,
    widgetRegistry: WidgetRegistry
  ) {
    widgetRegistry.register("tinymce", TinyMCEWidget);
  }

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
          this.handleSuccess();
          this.genericService.get(this.genericService.objId);
          this.sub.unsubscribe();
        }, (e: any) => { 
          this.handleError(e._body);
          this.sub.unsubscribe();
        });
    },
  }

  handleSuccess(){
    this.error = null;
    this.success = true;
    setTimeout(e => this.success = false, 2000);
  }

  handleError(err: string){
    this.error = err;
    this.success = false;
    setTimeout(e => this.error = null, 5000);
  }

  loadSchema(model: string, id: string = ''){
    let self = this;

    this.model = model;

    this.modelsub = this.genericService.selectModel(this.model).subscribe(
      response => {
        if (!response) self.router.navigate(["/404"]);

        if (id != ''){
          this.genericService.get(id).subscribe(p => {
            this.formSchema = this.genericService.generateFormSchema(p.json());
            this.objectModel = p.json();
            self.showForm = true;
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
