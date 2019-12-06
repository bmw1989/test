import { Injectable } from '@angular/core';
import { ResultVO } from '../model/commun/vo/ResultVO';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { host } from '../util/constantes-app';
import { AuthenticationService } from '../views/loginRoot/service/authenticationService';


@Injectable({
    providedIn: 'root',
  })

  export class PersonneService {
    
    private URL_GET_PERSONNE_BY_NNI = host + '/getperson/';
    private URL_GET_PERSONNE_DEFUNT_BY_NNI = host + '/getpersondefunt/';
    handleError: (reason: any) => ResultVO | PromiseLike<ResultVO>;

    constructor(private authService:AuthenticationService ,private http: HttpClient) { }

    getPersonneByNni(nni:string) : Promise<ResultVO>{
        return this.http.get(`${this.URL_GET_PERSONNE_BY_NNI}${nni}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO)
        .catch(this.handleError);
      }

}