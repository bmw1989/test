import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';

import {Observable} from 'rxjs';

import { Menu } from '../../model/design/menu';
import { AuthenticationService } from '../../views/loginRoot/service/authenticationService';
import { host } from '../../util/constantes-app';
import { ResultVO } from 'app/model/commun/vo/ResultVO';

@Injectable({
    providedIn: 'root',
  })
export class DesignService {

    constructor(private authService:AuthenticationService ,private http: HttpClient) { }

    getMenu() {
        return this.http.get(host+"/menu");

    }

    getMenuByUser() {
       //console.log("Token : " + this.authService.getJwtToken());
        return this.http.get(host+"/menuuser", {headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as Menu[])
        .catch(this.handleError);

    }
    getAllMenu() : Promise<ResultVO>{
      return this.http.get(host+"/allmenu", {headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
      .toPromise().then(response => response as Menu[])
      .catch(this.handleError);
  }
    private handleError(error: any): Promise<any> {
         return Promise.reject(error.status);
    }

  loadJSON(filePath) {
    const json = this.loadTextFileAjaxSync(filePath, "application/json");
    return JSON.parse(json);
  }

  loadTextFileAjaxSync(filePath, mimeType) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    if (mimeType != null) {
      if (xmlhttp.overrideMimeType) {
        xmlhttp.overrideMimeType(mimeType);
      }
    }
    xmlhttp.send();
    if (xmlhttp.status == 200) {
      return xmlhttp.responseText;
    }
    else {
      return null;
    }
  }
}
