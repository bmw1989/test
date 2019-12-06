import {Commune} from "./commune";
import {Villecanton} from "./villecanton";

export class CarreQuartionVillage{

  code:string;
	libelle:string;
	villeCanton: Villecanton = new Villecanton();
}
