import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractServiceService } from '../../../service/AbstractService';
import { AuthenticationService } from '../../../views/loginRoot/service/authenticationService';
import PersonnePhysique from '../model/personne-physique';
import { host } from '../../../util/constantes-app';
import { ResultVO } from '../../../model/commun/vo/ResultVO';

@Injectable({
    providedIn: 'root',
  })

@Injectable()
export class ContribuableService extends  AbstractServiceService{

    constructor( private authService:AuthenticationService ,
       private http: HttpClient ) {
        super();
    }

    ajouterNouveauPersonnePhysique(contribuable: PersonnePhysique): Promise<ResultVO> {
      return this.http.post(host+"/createcontribuablephy", JSON.stringify(contribuable) , {headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
              'Content-Type': 'application/json'})})
          .toPromise()
          .then(res => res as ResultVO)
          .catch(this.handleError);
  }

}
