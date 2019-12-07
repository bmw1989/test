import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Contribuable } from '../model/contribuable';
import { ResultVO } from '../../../model/commun/vo/ResultVO';
import { AuthenticationService } from '../../../views/loginRoot/service/authenticationService';
import { PersonnePhysique } from '../model/personne-physique';



@Component({
  selector: 'app-fiche-contribuable.component',
  templateUrl: './fiche-contribuable.component.html',
  styleUrls: ['./fiche-contribuable.component.scss']
})

export class FicheContribuableComponent implements OnInit {
	
	@Input() resultVO: ResultVO;

   @Input() newContribuable: Contribuable;
  
	constructor(private authServiceApp: AuthenticationService,
			   public translate: TranslateService) { }

	ngOnInit() {
		 this.newContribuable = new PersonnePhysique();
	}



	initializeResultVO () {
		if (this.resultVO == null) {
		  this.resultVO = new ResultVO ();
		}
		if (this.resultVO.messagesErrors == null) {
		  this.resultVO.messagesErrors = [];
		}
		if (this.resultVO.messagesInfo == null) {
		  this.resultVO.messagesInfo = [];
		}
		if (this.resultVO.messagesInfo.length > 0 || this.resultVO.messagesErrors.length > 0) {
		  window.scroll(0,0);
		}
	
	  }
	  


}
