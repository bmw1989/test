import {TypeActivite} from "./type-activite";
import {Contribuable} from "./contribuable";
import {Utilisateur} from "../../../model/utilisateur/Utilisateur";

export class FicheActivite {

  refActivite: TypeActivite;
  refContribuable: Contribuable;
  refUserCreation: Utilisateur;
  dateCreation;
  dateDebutActivite;
  dateFinActivite;

}
