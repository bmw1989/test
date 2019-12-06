

export class SearchCriteria {
    key:string;
    operation:string;
    value:string;

    constructor(cle, op, valeur) {
      this.key = cle;
      this.operation = op;
      this.value = valeur;
    } 
  }
