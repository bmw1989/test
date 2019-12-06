import {cau} from "./cau";
import {Lieu} from "./lieu";
import {Moughataa} from "./departement";

export class Commune{

    code:string;
	libelleFr:string;
	libelleAr:string;
	moughataa:Moughataa = new Moughataa();
	commune:Commune[];
	lieux:Lieu[];
	caus:cau[];
}
