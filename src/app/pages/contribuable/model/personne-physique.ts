import {Contribuable} from './contribuable';
import {Civilite} from "../../../model/referentiel/civilite";

export default class PersonnePhysique extends Contribuable{

  civilite:Civilite = Civilite.Mr;
  nni:string;
	prenomFr:string;
	prenomAr:string;
	nomFr:string;
	nomAr:string;
	codeNationnalite:string;
    
}
