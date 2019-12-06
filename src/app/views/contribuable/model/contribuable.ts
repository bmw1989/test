import { Utilisateur } from 'app/model/utilisateur/Utilisateur';

export class Contribuable{
    reference:string;
	nni:string;
	nomSociete:string;
	prenomFr:string;
	prenomAr:string;
	nomFr:string;
	nomAr:string;
	codeNationnalite:string;
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
	
	//private Pays refPays; //????????????????

	refUserCreation:Utilisateur;
	dateCreation:string;
}