import {ResultVO} from "../model/commun/vo/ResultVO";
/**
 * Created by Omar on 07/02/2019.
 */

export class AbstractServiceService {
  protected handleError(error: any): Promise<any> {
    let resultVo = new ResultVO();
//    let statusDisconnected = Math.floor(error.status / 100) == 4 && error.status != 404;
    let statusDisconnected = error.status == 403 || error.status == 401;
    if (statusDisconnected) {
      resultVo.isDeconnected = true;
    }
    return Promise.reject(resultVo);
  }
}
