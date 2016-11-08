import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';


import { HttpClient } from '../shared/services/http.service';
import { Field } from '../shared/models/field.model';

@Injectable()
export class GenericService {

  constructor(private http : HttpClient) { }

  private newObj = true;

  // what is our model?
  public model: string;

  // is there a static ID to store?
  public objId: string;

  // hold our array of fields...
  public schema: Field[];


  // set the model...
  selectModel(model ?: string): Observable<boolean>{
    this.model = model;
    return this.http.get("/schema/" + this.model)            
      .map((response: Response) => {
        if (!response || !response.json().length) return false;
        this.schema = response.json().map( f => {
          var field = new Field();
          field.init(f);
          return field;
        });

        this.generateFormSchema();

        return true;
      }).catch(this.handleError);
  };



  // get elements...
  get(id ?: string): Observable<Response>{
    if (typeof id !== 'undefined' && id != ''){
      this.objId = id;
      this.newObj = false;
      return this.http.get("/" + this.model + "/" + id);
    } else {
      this.newObj = true;
      return this.http.get("/" + this.model);
    }
  };



  // save the object...
  save(obj: any): Observable<Response>{
    if (!this.newObj) return this.http.put("/" + this.model + "/" + this.objId, JSON.stringify(obj)); 
    return this.http.post("/" + this.model, obj);
  };



  // delete an object
  delete(id ?: string): Observable<Response>{
    if (!id) return this.handleError("Invalid ID");
    return this.http.delete("/" + this.model + "/" + id);
  };



  generateFormSchema(obj: any = {}){
    let json = {
      type: "object",
      properties: {},
      required: [],
      buttons: [{
        "id": "save",
        "classes": "btn btn-default form-control",
        "label": "Save"
      }]
    };

    // foreach field...
    for (var i=0; i < this.schema.length; i++){
      let field = this.schema[i];

      // init a property...
      let property: any = {};

      // set the data type...
      property.type = field.type;

      // does it have a special widget? (select, checkbox, etc)
      if (field.widget != '') property.widget = field.widget;

      // if it has options (select,radio) add them...
      if (field.options.length) property.oneOf = field.options.map(function(a){ return { "enum": [a], "description": a.toUpperCase() } });

      // if there is a value...add it...
      // if (typeof obj[field.field] !== 'undefined') property.default = obj[field.field];

      // some other values...
      property.placeholder = field.placeholder;
      property.description = field.label;

      // append the property to our response...
      json.properties[field.field] = property;


      // is this a required field?
      if (field.required) json.required.push(field.field);
    
    }

    return json;
  };



  private handleError (error: any) {
    // log error
    console.log(error);
    // could be something more sofisticated
    let errorMsg = error.message || `Server Error`

    // throw an application level error
    return Observable.throw(errorMsg);
  };

}
