import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { host } from '../util/constantes-app';
import { AuthenticationService } from '../pages/loginRoot/service/authenticationService';
import { ResultVO } from '../model/commun/vo/ResultVO';
import {AbstractServiceService} from "./AbstractService";

@Injectable({
    providedIn: 'root',
  })
export class ReferentielService extends AbstractServiceService{

    private URL_GET_DEPARTEMENT_BY_PROVINCE = host+"/referentiel/moughataabywilaya/";
    private URL_GET_COMMUNE_BY_DEPARTEMENT = host+"/referentiel/communebymoughataa/";
  private URL_GET_VILLECANTON_BY_COMMUNE = host+"/referentiel/lieuparcommune/";
  private URL_GET_CQV_BY_VILLECANTON = host+"/referentiel/lieuparcommune/";
    private URL_GET_NATIONNALITE = host+"/referentiel/nationalites";
    private URL_GET_PROFESSION = host+"/referentiel/professions";
    private URL_GET_CAUSES_DECES = host+"/referentiel/causesDeces";
    private URL_GET_GENRES_DECES = host+"/referentiel/genresDeces";
    private  URL_GET_TRIBUNAL = host+"/referentiel/tribunaux";
  private URL_GET_NATIONALITE_BY_CODE = host + "/referentiel/nationalitebycode/";
    private URL_GET_COMMUNE_BY_CODE = host + "/referentiel/communebycode/";
  private URL_GET_CQV_BY_CODE = host + "/referentiel/lieubycode/";
  private URL_GET_DEPARTEMENT_BY_CODE = host + "/referentiel/moughataabycode/";
  private URL_GET_PROVINCE_BY_CODE = host + "/referentiel/wilayabycode/";
  private URL_GET_CAU_LIST = host + "/referentiel/cacs";
  private URL_GET_TYPE_DOC_SCAN_LIST = host + "/referentiel/typeDocumentsByTypeActe/";
  private URL_GET_LIENS_PARENTAL = host+"/referentiel/liensParental";
  private URL_GET_LIEN_PARENTAL_BY_CODE = host + "/referentiel/lienparentalbycode/";
  private URL_GET_LEXIQUE_FR_BY_NOM_AR = host + "/referentiel/lexiqueNamesForNameAr/";
  private URL_GET_LEXIQUE_AR_BY_NOM_FR = host + "/referentiel/lexiqueNamesForNameFr/";

    constructor(private authService:AuthenticationService ,private http: HttpClient) {super(); }

    getNationalite() : Promise<ResultVO>{
        return this.http.get(this.URL_GET_NATIONNALITE, {headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO)
        .catch(this.handleError);
    }

  getProfessions(): Promise<ResultVO>{
    return this.http.get(this.URL_GET_PROFESSION, {headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO)
        .catch(this.handleError);
  }

    getCausesDeces() : Promise<ResultVO>{
        return this.http.get(this.URL_GET_CAUSES_DECES, {headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO)
        .catch(this.handleError);
    }
    getGenresDeces() : Promise<ResultVO>{
        return this.http.get(this.URL_GET_GENRES_DECES, {headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO)
        .catch(this.handleError);
    }
  getTribunaux() : Promise<ResultVO>{
    return this.http.get(this.URL_GET_TRIBUNAL, {headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
      .toPromise().then(response => response as ResultVO)
      .catch(this.handleError);
  }
    getProvinces() : Promise<ResultVO>{
        return this.http.get(host+"/referentiel/wilayas", {headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO)
        .catch(this.handleError);
    }

  getProvincesCasTranscription () : Promise<ResultVO>{
    return this.http.get(host+"/referentiel/wilayacastranscription", {headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO)
        .catch(this.handleError);
  }

    getDepartementsByProvince(codeProvince) : Promise<ResultVO>{
        return this.http.get(`${this.URL_GET_DEPARTEMENT_BY_PROVINCE}${codeProvince}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO);
        //.catch(this.handleError);
    }

    getCommunesByDepartement(codeDepartement): Promise<ResultVO>{
        return this.http.get(`${this.URL_GET_COMMUNE_BY_DEPARTEMENT}${codeDepartement}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO)
        .catch(this.handleError);
    }
  getCQVByCode(code): Promise<ResultVO>{
    return this.http.get(`${this.URL_GET_CQV_BY_CODE}${code}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
      .toPromise().then(response => response as ResultVO);
  }

  getLieuxByCommune(codeCommune): Promise<ResultVO>{
    return this.http.get(`${this.URL_GET_CQV_BY_VILLECANTON}${codeCommune}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
      .toPromise().then(response => response as ResultVO)
      .catch(this.handleError);
  }
  getLieuxByCommunes(codeCommune): Promise<ResultVO>{
    return this.http.get(`${this.URL_GET_VILLECANTON_BY_COMMUNE}${codeCommune}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
      .toPromise().then(response => response as ResultVO)
      .catch(this.handleError);
  }

  getCommuneByCode(code): Promise<ResultVO>{
    return this.http.get(`${this.URL_GET_COMMUNE_BY_CODE}${code}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
      .toPromise().then(response => response as ResultVO);
  }

  getDepartementByCode(code): Promise<ResultVO>{
    return this.http.get(`${this.URL_GET_DEPARTEMENT_BY_CODE}${code}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
      .toPromise().then(response => response as ResultVO);
  }

  getProvinceByCode(code): Promise<ResultVO>{
    return this.http.get(`${this.URL_GET_PROVINCE_BY_CODE}${code}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
      .toPromise().then(response => response as ResultVO);
  }

  getCAUs(): Promise<ResultVO>{
    return this.http.get(`${this.URL_GET_CAU_LIST}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
      .toPromise().then(response => response as ResultVO);
  }

  getNationaliteByCode(code): Promise<ResultVO>{
    return this.http.get(`${this.URL_GET_NATIONALITE_BY_CODE}${code}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
      .toPromise().then(response => response as ResultVO);
  }

  getTypeDocumentScanneByTypeActe(codeTypeActe): Promise<ResultVO>{
    return this.http.get(`${this.URL_GET_TYPE_DOC_SCAN_LIST}${codeTypeActe}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
      .toPromise().then(response => response as ResultVO);
  }

  getLiensParental(): Promise<ResultVO>{
    return this.http.get(this.URL_GET_LIENS_PARENTAL, {headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO)
        .catch(this.handleError);
  }

  getLienParentalByCode(code): Promise<ResultVO>{
    return this.http.get(`${this.URL_GET_LIEN_PARENTAL_BY_CODE}${code}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO);
  }

  getLexiqueNamesArByNameFr(code): Promise<ResultVO>{
    return this.http.get(`${this.URL_GET_LEXIQUE_AR_BY_NOM_FR}${code}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO);
  }

  getLexiqueNamesFrByNameAr(code): Promise<ResultVO>{
    return this.http.get(`${this.URL_GET_LEXIQUE_FR_BY_NOM_AR}${code}`,{headers:new HttpHeaders({'authorization':this.authService.getJwtToken()})})
        .toPromise().then(response => response as ResultVO);
  }

}
