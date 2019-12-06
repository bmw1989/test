function loadJSON(filePath) {
  const json = loadTextFileAjaxSync(filePath, "application/json");
  return JSON.parse(json);
}

function loadTextFileAjaxSync(filePath, mimeType) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    return xmlhttp.responseText;
  }
  else {
    return null;
  }
}

export const params = loadJSON('assets/parametres.json');
//alert(params.ip);
//alert(params.port);
export const host:string = params.ip+":"+ params.port + params.context;
//alert(host);
export const DELAI_LEGAL = 'DELAI_LEGAL';
export const JUGEMENT = 'JUGEMENT';
export const TRANSCRIPTION = 'TRANSCRIPTION';
export const JUGEMENT_SUPPLETIF = 'JUGEMENT_SUPPLETIF';



