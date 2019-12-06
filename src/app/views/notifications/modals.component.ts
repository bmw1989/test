import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'modals.component.html'
})
export class ModalsComponent {
    public myModal;
    public largeModal;
    public smallModal;
    public primaryModal;
    public successModal;
    public warningModal;
    public dangerModal;
    public infoModal;
    public scanModal;

    url:any;

    openPopupScan () {
      window.open('/assets/scannerDocuments.html', "status:false;dialogWith:600px;dialogHeight:850px");
    }
  onSelectFile(baseString) {
    if (baseString != null && baseString != "") {
      let reader = new FileReader();

      reader.readAsBinaryString(this.convertBase64ToBinaryUrl(baseString)); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      }
    }
  }
  convertBase64ToBinaryUrl (baseString) {
    let binaryString = atob(baseString);
    let binaryLen = binaryString.length;
    let byteArray = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      let ascii = binaryString.charCodeAt(i);
      byteArray[i] = ascii;
    }
    let file = new Blob([byteArray], {type: 'application/pdf'});
  //  let fileURL = window.URL.createObjectURL(file);

    return file;
  }
}
