import {Injectable} from "@angular/core";
import {FormControl} from "@angular/forms";
import * as moment from "moment";


@Injectable({
  providedIn: 'root',
})


export class UtilService {

  convertBase64ToBinaryUrl (baseString) {
    let binaryString = atob(baseString);
    let binaryLen = binaryString.length;
    let byteArray = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      let ascii = binaryString.charCodeAt(i);
      byteArray[i] = ascii;
    }
    let file = new Blob([byteArray], {type: 'application/pdf'});

    return file;
  }
  convertBase64ToBinaryUrlMime (baseString, typeMime) {
    let binaryString = atob(baseString);
    let binaryLen = binaryString.length;
    let byteArray = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      let ascii = binaryString.charCodeAt(i);
      byteArray[i] = ascii;
    }
    let file = new Blob([byteArray], {type: typeMime});

    return file;
  }

  convertToDateInputDate (strdate:string) {
    if(strdate==null ||strdate==undefined || strdate=="") {
        return null;
    }
    let varRGEX = /[0-9]{2}.[0-9]{2}.[0-9]{4}/;
    if (!varRGEX.test(strdate)) {
      return strdate;
    }
    let annee;
    let mois;
    let jour;
    annee=strdate.substring(6,10);
    mois =strdate.substring(3,5);
    jour =strdate.substring(0,2);
    return annee+"-"+mois+"-"+jour;
  }
  convertInputDateToDate (strdate:string) {
    if(strdate==null ||strdate==undefined || strdate=="")
      return null;
    let varRGEX = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    if (!varRGEX.test(strdate)) {
      return strdate;
    }
    let annee;
    let mois;
    let jour;
    annee=strdate.substring(0,4);
    mois =strdate.substring(5,7);
    jour =strdate.substring(8,10);
    return jour+"/"+mois+"/"+annee;
  }

 calculateAge(dateNaissance : Date) : number
  {
    let diffEnMS = Date.now() - dateNaissance.getTime();

    let age = new Date(diffEnMS);

    return Math.abs(age.getUTCFullYear() - 1970);
  }
  formatDate(date : Date) : String
  {
    let dd;
    let mm;
    let d = (date.getDate());
    let m = (date.getMonth() + 1); //January is 0!
    let y = (date.getFullYear());

    if (d < 10) {
    dd = '0' + d;
    }else{
      dd = d;
    }
    if (m < 10) {
    mm = '0' + m;
    }else{
      mm = m;
    }
    let today = dd + '/' + mm + '/' + y;
    return today;
  }
  // La fonction compare retourne true si sdate1>sdate2, false sin non
  compareDates(sdate1:any,sdate2:any) : boolean
  {
    if(sdate1 == null || sdate2 == null){
      return;
    }
  let date1 = new Date();
  date1.setFullYear(sdate1.substr(6,4));
  date1.setMonth(sdate1.substr(3,2));
  date1.setDate(sdate1.substr(0,2));
  date1.setHours(0);
  date1.setMinutes(0);
  date1.setSeconds(0);
  date1.setMilliseconds(0);
  let d1=date1.getTime()

  let date2 = new Date();
  date2.setFullYear(sdate2.substr(6,4));
  date2.setMonth(sdate2.substr(3,2));
  date2.setDate(sdate2.substr(0,2));
  date2.setHours(0);
  date2.setMinutes(0);
  date2.setSeconds(0);
  date2.setMilliseconds(0);
  let d2=date2.getTime()

  if(d1>d2)
  {
    return true;
  }
  else
  {
    return false;
  }
 }

 isHeure(testHeure): boolean{
     let date_regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/ ;
     return date_regex.test(testHeure);
 }

isTelepehone(tel): boolean{
    let date_regex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g ;
    return date_regex.test(tel);
}

  isDateValide(testdate):boolean {
    testdate = this.convertInputDateToDate (testdate);
    let date_regex = /^(?=\d{2}([-.,\/])\d{2}\1\d{4}$)(?:0[1-9]|1\d|[2][0-8]|29(?!.02.(?!(?!(?:[02468][1-35-79]|[13579][0-13-57-9])00)\d{2}(?:[02468][048]|[13579][26])))|30(?!.02)|31(?=.(?:0[13578]|10|12))).(?:0[1-9]|1[012]).\d{4}$/ ;
    return date_regex.test(testdate);
  }

  isNumeric(number):boolean {
    let date_regex = /^\d*$/ ;
    return date_regex.test(number);
  }

  isNni(number):boolean {
    let date_regex = /^([0-9]{10})$/ ;
    if(!date_regex.test(number)){
        return false;
    }
     if((number - 1) % 97 != 0) {
         return false;
     }
    return true;
  }

  imprimerDirectPdf (url, objParent) {
    let OldObjObject = document.getElementById('idObjImprHtml');
    if (OldObjObject) {
      document.body.removeChild(OldObjObject);
    }
    objParent.showSpin = true;
    let objObject:HTMLObjectElement = document.createElement("object") as HTMLObjectElement;
    objObject.data = url;
    objObject.type = 'application/pdf';
    objObject.tabIndex=-1;
    objObject.height = '1';
    objObject.id = 'idObjImprHtml';

    objObject.onloadeddata = new function () {
      objParent.showSpin = false;
    };

    document.body.appendChild(objObject);
  }


}
