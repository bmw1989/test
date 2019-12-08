import {TypeActivite} from "./type-activite";
import {Contribuable} from "./contribuable";
import {Utilisateur} from "../../../model/utilisateur/Utilisateur";

export class FicheActivite {

  refTypeActivite: TypeActivite;
  refContribuable: Contribuable;
  refUserCreation: Utilisateur;
  dateCreation;

}
