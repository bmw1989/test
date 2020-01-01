/**
 * Created by admin on 08/12/2018.
 */
export class  ResultVO {
  data:object={};
  messagesErrors:Array<any>=[];
  messagesInfo:Array<any>=[];
  messagesWarning:Array<any>=[];
  isDeconnected:boolean = false;
  estModeConnecte:boolean;
  action:string;

}
