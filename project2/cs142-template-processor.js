function Cs142TemplateProcessor(template){
    this.template= template;
  }
  Cs142TemplateProcessor.fillIn = function(dictionary){
    var temp = this.template;
    if(temp.includes("{{month}}")){
      temp = temp.replace("{{month}}",dictionary.month);
    }
  
    if(temp.includes("{{day}}")){
      temp = temp.replace("{{day}}",dictionary.day);
    }
  
    if(temp.includes("{{year}}")){
      temp = temp.replace("{{year}}",dictionary.year);
    }
    return temp;
  };