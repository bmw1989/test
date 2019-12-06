import {Wilaya} from './province';
import { Commune } from './commune';

export class Moughataa{
    code:string;
	libelleFr:string;
	libelleAr:string;
	wilaya:Wilaya = new Wilaya();
	communes:Commune[];
}
