//~ jslib/KnotMaker.js
//~ 
//~ encoding: UTF-8 Unicode (with BOM)


if (!this.KnotMaker) {
    this.KnotMaker = {};
//~ javascript:this.KnotMaker = { VERSION : "2009-11-17-01:19:35".replace(/\D/g,"") }; KnotMaker.alert(KnotMaker.VERSION);
}
(function () {

KnotMaker.VERSION  = "2009-11-24-05:51:53";

//~ http://ejohn.org/blog/__file__-in-javascript/
(function(){
  this.__defineGetter__("__FILE__", function() {
    return (new Error).stack.split("\n")[2].split("@")[1].split(":").slice(0,-1).join(":");
  });
})();

(function(){
  this.__defineGetter__("__DIR__", function() {
    return __FILE__.substring(0, __FILE__.lastIndexOf('/'));
  });
})();

//~ http://krijnhoetmer.nl/stuff/javascript/include-javascript/
//~ NOT THIS http://www.openjsan.org/src/a/ad/adurdin/JSModule-0.11/
function include(file,charset) {
    if (document.createElement && document.getElementsByTagName) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', __DIR__ + '/' + file);
        if(charset){
            script.setAttribute('charset', charset);
        }

        head.appendChild(script);
    } else {
        KnotMaker.alert('Your browser can\'t deal with the DOM standard. That means it\'s old. Go fix it!');
    }
}

//~ http://javascript.crockford.com/remedial.html
String.prototype.entityify = function () {
    return this.replace(/&/g, "&amp;").replace(/</g,
        "&lt;").replace(/>/g, "&gt;");
};

//~ KnotMaker.alert = alert; // Error: uncaught exception: [Exception... "Illegal operation on WrappedNative prototype object"  nsresult: "0x8057000c (NS_ERROR_XPC_BAD_OP_ON_WN_PROTO)"  location: "JS frame :: file:///...jslib/KnotMaker.drawers.js :: anonymous :: line 266"  data: no]
KnotMaker.alert = function(s){return alert(s)};

include("json2.js",'UTF-8');
// these appear to be loaded in order
include("KnotMaker.tiles.js",'UTF-8'); // eventually defines  KnotMaker.tiles ...
include("KnotMaker.ToolPanelList.js",'UTF-8'); // eventually defines KnotMaker.ToolPanelList
include("KnotMaker.predefinedKnots.js",'UTF-8'); // eventually defines  KnotMaker.predefinedKnots ...
include("KnotMaker.charCodeToalpha.js",'UTF-8'); // eventually defines  KnotMaker.charCodeToalpha, KnotMaker.aIx, KnotMaker.xIa 
include("KnotMaker.drawers.js",'UTF-8'); // eventually defines KnotMaker.drawIt(), KnotMaker.drawItWithTileSidebar() ...


//~ KnotMaker.textMyKeys = function(t){
//~     t.onclick =""; // cancel onclick
//~     var out = "";
//~     var str = '<textarea style="float:left" readonly onclick="(function(t){t.innerHTML+=&quot;\\n&quot;+(JSON.stringify(KnotMaker.HERE,null,\'    \')||KnotMaker.HERE)+\';\'; t.onclick=\'\'; return;})(this)" cols="25" rows="2">KnotMaker.HERE = </textarea>';
//~     for (var ix in KnotMaker ){
//~         out += str.replace(/HERE/g,ix);
//~     }
//~     t.innerHTML=out;
//~     return;
//~ }

KnotMaker.textMyKeys = function(t){
    t.onclick =""; // cancel onclick
    var out = "";
    KnotMaker.textMyKeysText = null;
KnotMaker.textMyKeysCallback = function(t){
    if(!KnotMaker.textMyKeysText){
        KnotMaker.textMyKeysText = document.getElementById('KnotMaker-textMyKeysText');
    }
    var key = t.value;
    //alert(t + t.value );
    KnotMaker.textMyKeysText.value = 'KnotMaker.'+key + ' = ' + (JSON.stringify(KnotMaker[key],null,'    ')||KnotMaker[key]);
    return;
};

    out += '<div style="float:left;width:20%;height: 400px;">';
    out += "KnotMaker.";
    out += "<select style=\"width:100%; height:100%; \" multiple>\n";
    for (var ix in KnotMaker) {
        out += '<option onclick="KnotMaker.textMyKeysCallback(this)">'+ix+"</option>\n";
    }
    out += "</select>\n";
    out += "</div>\n";
    out += '<div style="float:left; width:80%;height: 400px;">';
    out += "<form><textarea id=\"KnotMaker-textMyKeysText\" style=\"width:100%;height: 400px;\"></textarea>";
    out += "</div>\n";
    out += "<br style=\"clear:both;\"/>\n";

    t.innerHTML=out;
    return;
}

var out = "";
out +=("<div>");
out +=(__FILE__.entityify() + "<br/>");
out +=(__DIR__.entityify() + "<br/>");
//~ style="white-space:pre;"
out +=( '<div >'+JSON.stringify(KnotMaker,null,'  ').entityify() + "</div>");
out +=("</div>");
out +=('<div style="width: 100%; height: 100%;" onclick="KnotMaker.textMyKeys(this)">KnotMaker.textMyKeys(this)</div>');
out +=('<div style="clear:both;"></div>');

document.write(out);
return;
}());//the end
