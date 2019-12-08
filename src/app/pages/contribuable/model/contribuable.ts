import { Utilisateur } from '../../../model/utilisateur/Utilisateur';

export class Contribuable{
   
	reference:string;
	telephoneFixe:string;
	telephoneMobile:string;
	email:string;
	adresse:string;
	zone;
	carre;
	bloc;
	batiment;
	etage;
	porte;
	listActivite:[];
	observations:string;
	taxe; //????????????????
	// Pays refPays; //????????????????
    photo;
	refUserCreation:Utilisateur;
	dateCreation;
}
