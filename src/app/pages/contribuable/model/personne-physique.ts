import { Contribuable } from './contribuable';
import {Civilite} from "../../../model/referentiel/civilite";

export class PersonnePhysique extends Contribuable{

  civilite:Civilite;
  nni:string;
	prenomFr:string;
	prenomAr:string;
	nomFr:string;
	nomAr:string;
	codeNationnalite:string;
    
}
