import {Component, Input, OnInit} from '@angular/core';
import {PieceJointeTelechargement} from "../../../model/commun/vo/pieceJointeTelechargement";
import {UtilService} from "../../../util/util.service";

@Component({
  selector: 'app-scan-component',
  templateUrl: './scan-component-mention.component.html',
  styleUrls: ['./scan-component-mention.component.scss']
})
export class ScanComponentMentionComponent implements OnInit {

  @Input() pieceJointe:PieceJointeTelechargement;
  @Input() modeConsultation:boolean = false;

  constructor(private utilService: UtilService) { }

  ngOnInit() {
    if (this.pieceJointe == null) {
      this.pieceJointe = new PieceJointeTelechargement();
    }
  }

  openPopupScan() {
    let newWindow = open('assets/scannerDocuments.html?id=' + this.pieceJointe.id, 'Scan', 'width=800,height=600');
    newWindow.focus();
  }

  telechargementPJ() {

    let  base64 = (<HTMLInputElement>window.document.getElementById(this.pieceJointe.id)).value;

    let blob = this.utilService.convertBase64ToBinaryUrlMime(base64, 'image/tiff');
    try {
      window.navigator.msSaveOrOpenBlob(blob);
    }
    catch (e) {
      let urlPdf = window.URL.createObjectURL(blob);
      window.open(urlPdf);
    }

  }

}
