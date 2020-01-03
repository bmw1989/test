import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractServiceService } from '../../../service/AbstractService';
import { AuthenticationService } from '../../loginRoot/service/authenticationService';
import { ResultVO } from 'app/model/commun/vo/ResultVO';
import { host } from '../../../util/constantes-app';


@Injectable({
    providedIn: 'root',
  })

@Injectable()
export class ActiviteService extends  AbstractServiceService{

    constructor( private authService:AuthenticationService ,
       private http: HttpClient ) {
        super();
    }

    getAllMenu(): Promise<ResultVO>{
        return this.http.get(host+"/typeactiviteprincipales", {headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO[])
        .catch(this.handleError);
    }


}
