import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractServiceService } from '../../../service/AbstractService';
import { AuthenticationService } from '../../../views/loginRoot/service/authenticationService';

@Injectable({
    providedIn: 'root',
  })

@Injectable()
export class ContribuableService extends  AbstractServiceService{

    constructor( private authService:AuthenticationService ,
       private http: HttpClient ) {
        super();
    }


}
