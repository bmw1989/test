import { Utilisateur } from '../../../model/utilisateur/Utilisateur';
import { FicheActivite } from './fiche-activite';

export  class Contribuable{

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
  latitude;
  longitude;
	listActivite: FicheActivite[];
	observations:string;
	taxe; //????????????????
	// Pays refPays; //????????????????
    photo;
	refUserCreation:Utilisateur;
	dateCreation;
}
