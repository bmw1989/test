import { Profil } from '../utilisateur/Profil';

/**
 * @author Berrada
 */
export class Notification{

    idNotification:Number;
    message:string;
    dateCreation:string;
    refProfil:Profil;
    codeCentre:string;
    estTraiter:boolean;
    //refTypeNotif:;
}
