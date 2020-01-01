import { Badge } from './badge';

export class Menu{

	id:string;
	libelleFr:string;
	libelleAr:string;
  title:string;
  link:string;
	url:string;
	icon:string;
	badge:Badge;
	children: Menu[];
	name:string;
	nbrNotification;
	
	childrenOutProfil: Menu[]; 
	childrenInProfil: Menu[];
}
