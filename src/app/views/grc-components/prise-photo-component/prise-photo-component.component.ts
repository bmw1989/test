import {Component, Input, OnInit} from '@angular/core';
import {ResultVO} from "../../../model/commun/vo/ResultVO";
import {PhotoPortrait} from "../../../model/commun/vo/photoPortrait";
import {UtilService} from "../../../util/util.service";

@Component({
  selector: 'app-prise-photo-component',
  templateUrl: './prise-photo-component.component.html',
  styleUrls: ['./prise-photo-component.component.scss']
})
export class PrisePhotoComponentComponent implements OnInit {

  @Input() resultVO:ResultVO;
  @Input() photo:PhotoPortrait;
  @Input() modeConsultation:boolean;

  constructor(private utilService: UtilService) { }

  ngOnInit() {

  }

  initializeResultVO() {
    if (this.resultVO == null) {
      this.resultVO = new ResultVO();
    }
    if (this.resultVO.messagesErrors == null) {
      this.resultVO.messagesErrors = [];
    }
    if (this.resultVO.messagesInfo == null) {
      this.resultVO.messagesInfo = [];
    }
    if (this.resultVO.messagesInfo.length > 0 || this.resultVO.messagesErrors.length > 0) {
      window.scroll(0, 0);
    }

  }

  openPopupPhoto() {
    let newWindow = open('assets/prisePhotoPortrait.html?id=resultPhotoPortraitId', 'Prise Photo', 'width=800,height=600');
    newWindow.focus();
  }

  telechargementPhoto() {

    let  base64 = (<HTMLInputElement>window.document.getElementById('resultPhotoPortraitId')).value;

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
