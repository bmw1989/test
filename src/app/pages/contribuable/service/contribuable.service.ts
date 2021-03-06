import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractServiceService } from '../../../service/AbstractService';
import { AuthenticationService } from '../../loginRoot/service/authenticationService';
import PersonnePhysique from '../model/personne-physique';
import { host } from '../../../util/constantes-app';
import { ResultVO } from '../../../model/commun/vo/ResultVO';
import {BeanRecherchePersonnePhy} from "../model/criteria/beanRecherchePersonnePhy";
import {BeanRecherchePersonneMorale} from "../model/criteria/beanRecherchePersonneMorale";
import {PersonneMorale} from "../model/personne-morale";

@Injectable({
    providedIn: 'root',
  })

@Injectable()
export class ContribuableService extends  AbstractServiceService{

    constructor( private authService:AuthenticationService ,
       private http: HttpClient ) {
        super();
    }

    savePersonnePhysique(contribuable: PersonnePhysique): Promise<ResultVO> {
      return this.http.post(host+"/createcontribuablephy", JSON.stringify(contribuable) , {headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
              'Content-Type': 'application/json'})})
          .toPromise()
          .then(res => res as ResultVO)
          .catch(this.handleError);
    }

    getListPersonnePhy(rechMulti:BeanRecherchePersonnePhy): Promise<ResultVO>{
      return this.http.post(host + '/personnesphy', JSON.stringify(rechMulti) ,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
        'Content-Type': 'application/json'})})
      .toPromise().then(response => response as ResultVO)
      .catch(this.handleError);
    }

    getListPersonneMorale(rechMulti:BeanRecherchePersonneMorale): Promise<ResultVO>{
      return this.http.post(host + '/personnesmorale', JSON.stringify(rechMulti) ,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
          'Content-Type': 'application/json'})})
        .toPromise().then(response => response as ResultVO)
        .catch(this.handleError);
    }


    savePersonneMorale(contribuable: PersonneMorale): Promise<ResultVO> {
    return this.http.post(host+"/savecontribuablemorale", JSON.stringify(contribuable) , {headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
        'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => res as ResultVO)
      .catch(this.handleError);
    }

}
