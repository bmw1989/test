import {cau} from "../referentiel/cau";
import {Profil} from "./Profil";
/**
 * Created by Omar on 12/02/2019.
 */

export class Utilisateur{
  id;
  nomFr:string;
  prenomFr:string;
  nomAr:string;
  prenomAr:string;
  username:string;
  libelleCentre:string;
  estActiver;
  dateCreation;
  refCentre:cau;
  refProfil: Profil;
}
