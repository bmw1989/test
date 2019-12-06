import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { host } from '../../../util/constantes-app';
import {NavigationExtras, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Utilisateur} from "../../../model/utilisateur/Utilisateur";
import {ResultVO} from "../../../model/commun/vo/ResultVO";
import {AbstractServiceService} from "../../../service/AbstractService";
import { NotificationGroup } from 'app/model/notification/notification-group';



@Injectable({ providedIn: 'root' })
export class  AuthenticationService extends AbstractServiceService{
  //private host:string = "http://localhost:8080";
  private jwtToken:string = null;
  private roles:Array<any>=[];

  listNotificationsGr : NotificationGroup[];
  listNot : any =[];
   
  constructor(private http:HttpClient, private router:Router) {
    super();
  }
  login(user) {
    return this.http.post(host+"/login", user,  {observe: 'response'}).toPromise().catch(this.handleError);
  }

  saveToken (jwt:string) {
    localStorage.setItem('token',jwt);
    this.jwtToken = jwt;
    let tokenInfo = jwt_decode(this.jwtToken.substr("Bearer ".length, this.jwtToken.length));
    this.roles = tokenInfo.roles;
   }

  loadToken () {
    if (this.jwtToken == null) {
      this.jwtToken = localStorage.getItem('token');
    }
  }

  getJwtToken(){
    this.loadToken();
    return this.jwtToken;
  }
  getUserConnected () {
    if (this.jwtToken == null) {
      return;
    }
    let jwtHelper = new JwtHelperService();
    let jwtDecoded = jwtHelper.decodeToken(this.jwtToken);
    return jwtDecoded.sub;
  //  this.roles = jwtDecoded.roles;

  }

  getObjUserConnected () {
    if (this.jwtToken == null) {
      new Utilisateur();
    }
    return this.http.get(host + '/getuserconnected',{headers:new HttpHeaders({'authorization':this.getJwtToken()})})
      .toPromise().then(response => response as ResultVO)
      .catch(this.handleError);
  }

  deconnectCurrentUser () {
    return this.http.get(host + '/deconnectCurrentUser',{headers:new HttpHeaders({'authorization':this.getJwtToken()})})
      .toPromise().then(response => response as ResultVO)
      .catch(this.handleError);
  }

  estUserAlreadyConnected (username) {
    return this.http.get(host + '/estUserAlreadyConnected/'+username)
      .toPromise().then(response => response as ResultVO)
      .catch(this.handleError);
  }

  logout () {
    let resultVO:ResultVO = new ResultVO();
    this.deconnectCurrentUser().then(resultat => {
      resultVO = resultat;
      localStorage.removeItem('token');
      this.jwtToken = null;
      this.router.navigateByUrl("/logout");
    }, (error => {
      resultVO = error;
      if (resultVO.isDeconnected) {
        this.logoutWithParam();
      }
    }));
  }

  logoutWithParam () {
    localStorage.removeItem('token');
    this.jwtToken = null;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "param": 'Votre Session a été expirée!'
      }
    };
     this.router.navigate(['/logout'], navigationExtras);

  }

 

 getListNotificationsGr(){
   
   return this.listNotificationsGr;
 }

 getListUtilisateurs() : Promise<ResultVO>{
   //'/utitlisateurs'
  return this.http.get(host + '/utilisateurs',{headers:new HttpHeaders({'authorization':this.getJwtToken()})})
  .toPromise().then(response => response as ResultVO)
  .catch(this.handleError);
}

geListNotifications() : Promise<ResultVO>{
  //'/utitlisateurs'
 return this.http.get(host + '/groupenotifications',{headers:new HttpHeaders({'authorization':this.getJwtToken()})})
 .toPromise().then(response => response as ResultVO)
 .catch(this.handleError);
}
 
}
