import { Component, OnInit, Input } from '@angular/core';
import {ResultVO} from "../../../model/commun/vo/ResultVO";

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alertmessages.component.html',
  styleUrls: ['./alertmessages.component.scss']
})
export class AlertmessagesComponent implements OnInit {

  @Input() resultVO: ResultVO;

  constructor() { }

  ngOnInit() {
  }

}
