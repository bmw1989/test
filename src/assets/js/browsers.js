function isFromEdit(e) {
    if (window.event) e = window.event;
    var target = e.target ? e.target : e.srcElement;
    var readonlycheck = false || e.target.readOnly;
    return ((!readonlycheck && target.tagName=="INPUT" && (target.type == "text" || target.type == "password" || target.type == "number")) || target.tagName=="TEXTAREA");
}

function bloquerBackSpace(e) {
    if (window.event) e = window.event;
    var touche = window.event ? e.keyCode : e.which;
    var target = e.target ? e.target : e.srcElement;
    if ((touche == 8 && !isFromEdit(e)) || touche == 116 ) {
        if (e.keyCode) e.keyCode=0;
        return false;
    }
    return true;
}

function isInternetExplorer()
{
    if (window.ActiveXObject) return true;
    return false;
}

function isActiveXSupported()
{
    if (isInternetExplorer()) return true;
    return false;
}


// Hide toolbar
function hideToolbar(){
 //   if (isInternetExplorer()) { // If Internet Explorer try to hide toolbar
        var prefix = "mainfacilwindow_";
        var now = new Date();
        var uniqid = now.getTime();
        // If the window is already named with the given prefix
        // then hopefully it was opened with this call to hideToolbar
        // and should already contain no toolbar
        if (window.name.substr(0, prefix.length) != prefix ){
            var w = screen.availWidth;
            var h = screen.availHeight;
            var response = window.open(window.top.location.href,prefix+uniqid,
            'fullscreen=yes,top=0,left=0,outerHeight='+h+',outerWidth='+w+",location=no,menubar=no,status=no,resizable=no,width="+w+",height="+h+",scrollbars=yes,copyhistory=0,directories=0"
            );
        //    var response = window.open(window.top.location.href,prefix+uniqid,"scrollbars=yes,resizable=yes");
        //   response.moveTo(0,0);
        //    response.resizeTo(screen.width,(screen.height-25));

            var obj_window = window.open('', '_self'); // Trick so that we can close the window without asking the user
            obj_window.opener = window;
            obj_window.focus();
            opener=self;

            if (response != null) {
                response = self.close();
            }
        }
 //   } // Else give up... no way
}


// hide contextmenu
var message="";
function clickIE()
{
    if (document.all)
    {
        (message);
        return false;
    }
}//end function clickIE

//The event object created with every mouse button action has a property that reveals which
//mouse button the user pressed. NN4s event model calls that property the which property.
function clickNS(e)
{
    if (document.layers || (document.getElementById && !document.all))
    {
        if (e.which == 2 || e.which == 3)
        {
            (message);
            return false;
        }
    }
}//end function clickNS

//The document.layers property is an array of positioned elements in the document.
//But due to the nonstandard way that NN4 implements positioned elements,
//not every positioned element is represented in the document.layers array.


if (document.layers)
	{
	document.captureEvents(Event.MOUSEDOWN);
	document.onmousedown = clickNS;
	}
else
	{
	document.onmouseup = clickNS;
	// desable contextmenu for webApp without layer
	document.oncontextmenu = clickIE;
	}
