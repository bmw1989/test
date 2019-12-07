/**
 * @author Mohamed BERRADA
 */
import { AbstractServiceService } from 'app/service/AbstractService';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utilisateur } from 'app/model/utilisateur/Utilisateur';
import { ResultVO } from 'app/model/commun/vo/ResultVO';
import { host } from 'app/util/constantes-app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profil } from 'app/model/utilisateur/Profil';
import {BeanRechercheUtilisateur} from './model/beanRechercheUtilisateur';
import {BeanRechercheProfil} from './model/beanRechercheProfil';
import { AuthenticationService } from '../../views/loginRoot/service/authenticationService';


@Injectable({
    providedIn: 'root',
  })

@Injectable()
export class AdministrationService extends  AbstractServiceService{

    constructor( private authService:AuthenticationService ,
        private modalService: NgbModal, private http: HttpClient ) {
        super();
    }

    ajouterNouveauUtilisateur(user:Utilisateur):Promise<ResultVO>{
        return this.http.post(host+"/createuser", JSON.stringify(user) , {headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
                'Content-Type': 'application/json'})})
            .toPromise()
            .then(res => res as ResultVO)
            .catch(this.handleError);
    }

    getListProfil() {
        return this.http.get(host + '/profils',{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
          .toPromise().then(response => response as ResultVO)
          .catch(this.handleError);
     }

    
    getListUtilisateurs(rechMulti:BeanRechercheUtilisateur) : Promise<ResultVO>{
       return this.http.post(host + '/utilisateurs', JSON.stringify(rechMulti) ,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
       'Content-Type': 'application/json'})})
       .toPromise().then(response => response as ResultVO)
       .catch(this.handleError);
     }
    

    getListAllProfils(rechMulti:BeanRechercheProfil) : Promise<ResultVO>{
    
     // console.log("Token ");
      //console.log(this.authService.getJwtToken());
     return this.http.post(host + '/allprofils', JSON.stringify(rechMulti) ,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
     'Content-Type': 'application/json'})})
     .toPromise().then(response => response as ResultVO)
     .catch(this.handleError);
    }

    enregistrerProfil(obj: any){
      return this.http.post(host+"/enrprofil", JSON.stringify(obj) , {headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
      'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => res as ResultVO)
      .catch(this.handleError);
    }

    activerProfil(profil: Profil){
      return this.http.post(host+"/activerprofil", JSON.stringify(profil) , {headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
      'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => res as ResultVO)
      .catch(this.handleError);
    }
    desactiverProfil(profil: Profil){
      return this.http.post(host+"/desactiverprofil", JSON.stringify(profil) , {headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
      'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => res as ResultVO)
      .catch(this.handleError);
    }

    activerUtilisateur(user: Utilisateur){
      return this.http.post(host+"/activeruser", JSON.stringify(user) , {headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
      'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => res as ResultVO)
      .catch(this.handleError);
    }
    desactiverUtilisateur(user: Utilisateur){
      return this.http.post(host+"/desactiveruser", JSON.stringify(user) , {headers:new HttpHeaders({'authorization':this.authService.getJwtToken(),
      'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => res as ResultVO)
      .catch(this.handleError);
    }
}
