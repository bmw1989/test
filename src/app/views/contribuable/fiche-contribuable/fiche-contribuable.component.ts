import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'app/views/loginRoot/service/authenticationService';
import { ResultVO } from 'app/model/commun/vo/ResultVO';
import { Contribuable } from '../model/contribuable';



@Component({
  selector: 'app-fiche-contribuable.component',
  templateUrl: './fiche-contribuable.component.html',
  styleUrls: ['./fiche-contribuable.component.scss']
})

export class FicheContribuableComponent implements OnInit {
	
	@Input() resultVO: ResultVO;

	public ajouterModal;

   @Input() newUser: Contribuable;
  
	constructor(private authServiceApp: AuthenticationService,
			   public translate: TranslateService) { }

	ngOnInit() {



		 
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
