
export class Field {
  field: string;
  type: string;
  widget: string;
  required: boolean;
  key: string;
  label: string;
  placeholder: string;
  options: string[];

  __construct(){}

  init(t: any){
    this.field = t.field;
    this.type = this.determineType(t.type);
    this.label = this.field.replace("_",' ').split(" ").map(function(a){ return a.charAt(0).toUpperCase() + a.slice(1); }).join(" ");
    this.required = t.null == 'NO' && t.extra == 'auto_increment' ? true : false;
    this.key = t.key;
    this.widget = this.determineWidget(t.type);
    this.placeholder = t.default;
    this.options = this.setOptions(t.type);
  };

  determineType(t: string){
    if (t.indexOf('int') == 0) return 'integer';
    if (t.indexOf('int(1)') == 0) return 'boolean';
    else return 'string';
  };

  determineWidget(t: string){
    if (t.indexOf('mediumtext') > -1) return 'tinymce';
    if (t.indexOf('text') > -1) return 'textarea';
    if (t.indexOf('set') == 0) return 'select';
    if (t.indexOf('enum') == 0) return 'select';
    if (t.indexOf('datetime') == 0) return 'date-time';
    if (t.indexOf('date') == 0) return 'date';
    if (t.indexOf('int(1)') == 0) return 'checkbox';
    else return '';
  };

  setOptions(t: string){
    let options = [];
    if (t.indexOf('enum') == 0 || t.indexOf('set') == 0){
      const regex = /'([^']*)'/g;
      let m;
      while ((m = regex.exec(t)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) regex.lastIndex++;
      
        // The result can be accessed through the `m`-variable.
        options.push(m[1]);
      }
    } // if indexof enum

    return options;

  } // setOptions

}