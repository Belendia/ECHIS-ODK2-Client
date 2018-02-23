import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any): any {

    try {
      let tmp: Date;
      if (typeof(value) === 'string')
      {
        tmp = new Date(value);
      } // else it is assumed to be date
          return tmp.getDate() + "/" + tmp.getMonth() + "/" + tmp.getFullYear();
    }
    catch (err) {
      console.log('formatdatepipe: date formatting error '+ err);
      return value;
    }
  }
}
