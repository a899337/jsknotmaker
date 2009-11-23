//~ jslib/KnotMaker.drawers.js
//~ defines
//~     KnotMaker.drawIt()
//~     KnotMaker.drawItWithTileSidebar()
//~     KnotMaker.drawItWithTileSidebar2()
//~     KnotMaker.drawItWithTileSidebar3()
//~ 
//~ encoding: UTF-8 Unicode (with BOM)


if (!this.KnotMaker) {
    this.KnotMaker = {};
}
(function () {

KnotMaker.currentTile = 'a';//default
KnotMaker.currentTileStatusImg = null;//default
KnotMaker.currentTileStatusDiv = null;//default
KnotMaker.setTile = function(img){
    KnotMaker.currentTile = KnotMaker.tilesReverse[img];

    if(KnotMaker.currentTileStatusImg === null){
        KnotMaker.currentTileStatusImg = document.getElementById("KnotMaker-currentTileStatusImg");
        KnotMaker.currentTileStatusDiv = document.getElementById("KnotMaker-currentTileStatusDiv");
    }

    KnotMaker.currentTileStatusImg.src =  KnotMaker.tiles[KnotMaker.currentTile];
    var tileidtip = "'"+KnotMaker.currentTile+'\' '+'('+ KnotMaker.currentTile.charCodeAt(0) +') ' ;
    var tiletitle = "Current tile " + tileidtip +  KnotMaker.currentTileStatusImg.src;
    KnotMaker.currentTileStatusImg.title = tiletitle.entityify();
    KnotMaker.currentTileStatusDiv.innerHTML = tileidtip.entityify();
    return;
};

KnotMaker.kmParseCypherString = function(s){
    var cs = s.split(' ');
    var cso = {};
    for(var i in cs ){ // col row tile color
        if(cs[i].match(/^(..)(.*?)(\d\d)?$/)){
//~ todo set max/min
            var k = RegExp.$1;
            var v = RegExp.$2;
            if( ! KnotMaker.tiles[v] ){
                v = KnotMaker.charCodeToalpha[v.charCodeAt(0)];
            }
            cso[k]=v;
        }
    }
    return cso;
}

KnotMaker.kmParse = function (s){
        var o = {};
if( /^{/.test(s) ){
//~ KnotMaker.GenKbJSON
//~ {"jsKnotMaker":"2009-11-17-01:19:35","Comments":"","Binary Signature":"","Overs Index":"","Cypher":[{"x":1,"y":0,"t":105},{"x":2,"y":0,"t":106},{"x":0,"y":1,"t":99},{"x":1,"y":1,"t":103},{"x":2,"y":1,"t":104},{"x":3,"y":1,"t":106},{"x":1,"y":2,"t":107},{"x":2,"y":2,"t":103},{"x":3,"y":2,"t":108},{"x":2,"y":3,"t":111}]}

    try {
        var jo = JSON.parse(s);
//~         KnotMaker.alert(jo + JSON.stringify(jo,null,'    '));
//~ YUCK!
        var o = {};
        for(var ix in { 
            "KnotMaker" : "",
            "jsKnotMaker" : "",
            "Comments" : "",
            "Binary Signature" : "",
            "Overs Index" : "",
            "Cypher String" : "",
            "Cypher" : "", }){
            if( jo.hasOwnProperty( ix ) ){
                if( ix === "Cypher String"){
                    alert(ix);
                    o[ix] = KnotMaker.kmParseCypherString(jo[ix]);
                } else if( ix === "Cypher"){
                    var cso = {};


var jox = jo[ix];
for( var tix in jox ){
    cso [ KnotMaker.xIa[ jox[tix].x ] + KnotMaker.xIa[ jox[tix].y ] ] = KnotMaker.charCodeToalpha[ jox[tix].t ];
}
//~                     for( var tix in jo[ix] ){
//~                         cso [ KnotMaker.xIa[ jo[ix][tix].x ] + KnotMaker.xIa[ jo[ix][tix].y ] ] = KnotMaker.charCodeToalpha[ jo[ix][tix].t ];
//~                     }
                    o["Cypher String"]=cso;
                } else {
                    o[ix] = jo[ix];
                }
            }
        }

//~         KnotMaker.alert(o + JSON.stringify(o,null,'    '));
//~         return o;
    } catch(e){
        KnotMaker.alert(e + "\n" + s);
    }
} else {
        s = s.split("\n");
        for(var i in s){
            if( s[i].match(/^(KnotMaker)\s+(\S+)$/        ) ){ o[RegExp.$1] = RegExp.$2             }
            if( s[i].match(/^(Knot Names)=\s*(.*)$/       ) ){ o[RegExp.$1] = RegExp.$2.split(',')  }
            if( s[i].match(/^(Comments)=\s*(.*)$/         ) ){ o[RegExp.$1] = RegExp.$2             }
            if( s[i].match(/^(Binary Signature)=\s*(.*)$/ ) ){ o[RegExp.$1] = RegExp.$2             }
            if( s[i].match(/^(Overs Index)=\s*(.*)$/      ) ){ o[RegExp.$1] = RegExp.$2.split(':')  }
            if( s[i].match(/^(Cypher String)=\s*(.*)$/    ) ){
                var cso = KnotMaker.kmParseCypherString(RegExp.$2);
                if( cso ){
                    o["Cypher String"]=cso;
                }
            }
        }
}
//~     KnotMaker.windowWrite(o + "\n" + JSON.stringify(o,null,'    '));
    return o;
};



    KnotMaker.SetdrawEditGridTile = function(t){ 
//~         KnotMaker.alert( t.innerHTML );
//~         KnotMaker.alert(t.title);
        t.title = t.title.replace(/^(..).*$/,"$1"+KnotMaker.currentTile);
        t.innerHTML = '<img src="'+KnotMaker.tiles[KnotMaker.currentTile]+'"/>';
        
        return;
    };



    KnotMaker.drawEditGrid=function(w,h,cs){ // cols rows cypherstring
        if( cs ){
            var max = KnotMaker.CountMax(cs);
            w =  max[0] > w ?  max[0] : w;
            h =  max[0] > h ?  max[0] : h;
        } else { cs = {}; }

        var out = '<table  class="drawEditGrid" bgcolor="#dddddd" border=0 cols="'+w+'" rows="'+h+'"> <tbody>';
        for (var irow = 0; irow <= w; irow++ ){
            out += "<tr>\n";
            for (var icol = 0; icol <= h; icol++ ){
//~                 var addr = KnotMaker.xIa[irow]+KnotMaker.xIa[icol];
                var addr = KnotMaker.xIa[icol]+KnotMaker.xIa[irow];
                var image = KnotMaker.tiles[''];
                if( cs[addr] ){
                    image = KnotMaker.tiles[cs[addr]];
                    addr = addr + cs[addr];
//~ KnotMaker.alert( addr +" " + image);
                }
//~                 out += '<td onclick="KnotMaker.SetdrawEditGridTile(this)" width=50 height=50 title="';
                out += '<td onclick="KnotMaker.SetdrawEditGridTile(this)" width="'+KnotMaker.tileWidth +'" height="'+KnotMaker.tileHeight+'" title="';
                out += addr+'">';
                out+='<img src="'+image+'"/>';
                out += "</td>\n";
            }
            out += "</tr>\n";
        }
        out += '</tbody></table>';
        return out;
    };



    KnotMaker.drawToolBar = function (){
//~         var out = "\n"+'<div class="drawToolBar" style="overflow:scroll;clear:both;width:100%">'+"\n";
        var out = "\n"+'<div class="drawToolBar" >'+"\n";


//~         out += KnotMaker.drawToolBar2() + '<br/>';

        for(var i in KnotMaker.tiles){
            out+='<a href="javascript:" onclick="KnotMaker.setTile(\''+KnotMaker.tiles[i] +'\')">';
            out+='<img border=1 hspace=0 vspace=0 src="'+KnotMaker.tiles[i]+'"';
            out+=' title=" '+i+' '+KnotMaker.tiles[i]+'"/></a>';
            out+="\n";
        }

        out += KnotMaker.drawToolBar2();
        out += KnotMaker.drawToolBar3();
        out+='<a href="#" onclick="KnotMaker.about()">about</a>';
        out+="</div>\n";
        return out;
    };


    KnotMaker.drawToolBar3 = function (){
        var out = "";
        out+= '(';

//~         var ix = 0;
//~     for(var i in KnotMaker.predefinedKnots){
//~         ix++;
//~ out+= '<a href="javascript:" onclick="KnotMaker.LoadPredefined(this,\''+i+'\');" title="'+i+'">'+ix+'</a> ';
//~     }
        var ix = 0;
//~         out+='<select onchange="KnotMaker.alert(this.options[this.selectedIndex].text);">';
        out+='<select onchange="KnotMaker.LoadPredefined(this,this.options[this.selectedIndex].text);">';
        out+= '<option></option> ';
    for(var i in KnotMaker.predefinedKnots){
        ix++;
out+= '<option>'+i+'</option> ';
    }
        out+= '</select>';
        out+= ')';
        out+= "\n";
        out+= "<div>\n";
        out+= '<img id="KnotMaker-currentTileStatusImg" src="'+KnotMaker.tiles[KnotMaker.currentTile]+'"/>';
        out+= '<div id="KnotMaker-currentTileStatusDiv">\'a\' (97) </div>';
        out+= "</div>\n";
        return out;
    };


    KnotMaker.drawToolBar2  = function (){
        var out = "";
        out+= '<a href="javascript:" onclick="KnotMaker.LoadPromptKb(this)">load</a>'+"\n";
        out+= 'SAVE(<a href="javascript:" onclick="KnotMaker.SavePromptKb(this)">prompt</a> ';
        out+= '<a href="javascript:" onclick="KnotMaker.SaveWriteKm(this)">write</a>)';
        out+= ' &nbsp; &nbsp; ';
        out+= '<a href="javascript:" onclick="KnotMaker.clearAllGrid(this)">CLEAR ALL</a>'+"\n";
        out+='<a href="#" onclick="KnotMaker.about()">about</a>';
        out+= "\n";
        return out;
    };

    KnotMaker.CountMax=function (cs){
        var maxR =0;
        var maxC =0;
        for (var i in cs){
//~ 'abd' first column, second row, tile imade 'd'
            if( i.match(/^(.)(.)$/) ){
                var col = RegExp.$1;
                var row = RegExp.$2;
                var til = cs[i];
                if ( KnotMaker.aIx[col] > maxC ){ maxC = KnotMaker.aIx[col] }
                if ( KnotMaker.aIx[row] > maxR ){ maxR = KnotMaker.aIx[row] }
            }
        }
        
//~ KnotMaker.alert('KnotMaker.CountMax '+maxR + ' '+ maxC );
        return [ maxR, maxC];
    };


    KnotMaker.LoadPromptKb = function(t){
        var table = KnotMaker.findTable(t);
//~         var cypher = prompt("Cypher String="," abi00 acj00 bac00 bbg00 bch00 bdj00 cbk00 ccg00 cdl00 dco00");
var cypher = prompt("Cypher String="," bai00 caj00 abc00 bbg00 cbh00 dbj00 bck00 ccg00 dcl00 cdo00");
        if(cypher){
            if( !(/^{/.test(cypher)) && ! (/^Cypher String=/).test(cypher) ){
                cypher = "Cypher String=" + cypher;
            }
            var km = KnotMaker.kmParse(cypher);

//~             KnotMaker.alert( cypher + JSON.stringify( km ,null,'    '));

            table.parentNode.innerHTML = KnotMaker.drawEditGrid(20,20,km["Cypher String"]);

//~             KnotMaker.alert(( '<pre style="overflow:scroll"> tiles: '+JSON.stringify( tiles,null,'    ' ) +'</pre>'));
        }
        return;
    };
    KnotMaker.LoadPredefined = function(t,cs){
        try { t.blur(); } catch(e){ 1; }
        var table = KnotMaker.findTable(t);
        if( KnotMaker.predefinedKnots[cs] ){
            if( typeof(KnotMaker.predefinedKnots[cs])==="string"){
                KnotMaker.predefinedKnots[cs]= KnotMaker.kmParse(KnotMaker.predefinedKnots[cs]);
            }
//~ KnotMaker.alert(JSON.stringify(KnotMaker.predefinedKnots[cs],null,'    '));
            table.parentNode.innerHTML = KnotMaker.drawEditGrid(20,20, KnotMaker.predefinedKnots[cs]["Cypher String"]);
        }
        return;
    };
    KnotMaker.clearAllGrid = function(t){
        var table = KnotMaker.findTable(t);
//~ table.rows.length
        var out = KnotMaker.drawEditGrid(table.getAttribute("cols"), table.getAttribute("rows"));
//~         KnotMaker.alert(table + table.cols  + out);
        table.parentNode.innerHTML = out;
        return;
    };
    KnotMaker.windowWrite = function(s){
        if(0){
            var zw=open();
            var z=zw.document;
            z.write("<pre>" + s.entityify() );
            z.close();
            zw.focus();
        } else {
            if(!( KnotMaker.hasOwnProperty('Popup') && KnotMaker.Popup ) ){
                KnotMaker.Popup = document.getElementById('KnotMaker-Popup');
                KnotMaker.PopupText = document.getElementById('KnotMaker-PopupText');
            }
            KnotMaker.PopupText.innerHTML = s.entityify();
            KnotMaker.Popup.style.display= "block";
            KnotMaker.Popup.style.visibility= "visible";
            KnotMaker.PopupText.select(); // select works more reliably after visible
        }
        return;
    }
    KnotMaker.ClosePopup = function(t){
//~         KnotMaker.Popup.innerHTML = "";
        KnotMaker.Popup.style.display= "none";
        KnotMaker.Popup.style.visibility= "hidden";
        return;
    }
    KnotMaker.SaveWriteKm = function (t) {
        KnotMaker.windowWrite(KnotMaker.GenKb(KnotMaker.findTable(t)));
        return;
    };

    KnotMaker.SaveWriteKmJSON = function (t) {
        KnotMaker.windowWrite( JSON.stringify(KnotMaker.GenKbJSON(t),null,'    '));
        return;
    };

    KnotMaker.GenKb = function(t){
//~         var tds = (t.getElementsByTagName('table'))[0];
        var tds = KnotMaker.findTable(t).getElementsByTagName('td');
        var out = "KnotMaker v1.2\nKnot Names=\nComments=\nBinary Signature=\nOvers Index=\nCypher String=";
        for( var i in tds ){
            if( tds[i] && tds[i].title && tds[i].title.match(/^.../)){
                out += " " + tds[i].title + '00' ;
            }
        }
        out += "\n";
        return out;
    };
    KnotMaker.findTable = function(t){
        var target = null;
        for(var i in [ 1,2,3,4,5, 6, 7, 8, 9, 10 ]){
            var tables = t.getElementsByTagName('table');
            if(tables.length == 1){
                target = tables[0];
                if(target.className && (/\bdrawEditGrid\b/).test(target.className)){
                    break;
                }
            }
            t = t.parentNode;
        }
        return target;
    };

KnotMaker.SavePromptKb = function(t){ KnotMaker.alert(KnotMaker.GenKb(t)); return; };
KnotMaker.SavePromptKbJSON = function(t){ KnotMaker.alert(JSON.stringify( KnotMaker.GenKbJSON(t))); return;  };
KnotMaker.GenKbJSON = function(t){
    var KbJSON = {
        "jsKnotMaker" : KnotMaker.VERSION,
        "Comments" : "",
        "Binary Signature" : "",
        "Overs Index" : "",
        "Cypher" : [],
    };
    var tds = KnotMaker.findTable(t).getElementsByTagName('td');
        
    for( var i in tds ){
        if( tds[i] && tds[i].title && tds[i].title.match(/^(.)(.)(.)/)){
            KbJSON.Cypher.push( {
                x : KnotMaker.aIx[RegExp.$1],
                y : KnotMaker.aIx[RegExp.$2],
                t : RegExp.$3.charCodeAt(0)
            });
        }
    }
    return KbJSON;
};

    

    
    var charCodeAtTiles = {};
    KnotMaker.SavePromptKbDebug = function(t){
        var out = "document.characterSet "+document.characterSet+"\n";
        out += JSON.stringify(KnotMaker.tiles,null,'    ')+"\n\n";
        out += JSON.stringify(  KnotMaker.GenKb(  KnotMaker.findTable(t)  ),null,'    '  ) +"\n\n";
        function pp(s){ return '('+s+')' };
        if(1){
            if(charCodeAtTiles){
                for(var i in KnotMaker.tiles){
                    charCodeAtTiles[pp(i.length) + pp(i.charCodeAt(0))] = KnotMaker.tiles[i];
                }
            }
            out += JSON.stringify(  charCodeAtTiles ,null,'    ')+"\n\n";
        }
        KnotMaker.alert(out);

    if(1){
        var ret = prompt(" ").split(" ");
        var out = "\n";
        for(var i in ret ){
            if(ret[i].match(/^(..)(.*?)(\d\d)?$/)){
                out += RegExp.$1 + pp(RegExp.$2.charCodeAt(0)) + "\n";
            }
        }
        KnotMaker.alert(out);
    }

        return;
    };

    KnotMaker.drawIt = function(){
        var out = '<div class="KnotMaker">'+"\n"+KnotMaker.drawToolBar();
out+= '<div id="KnotMaker-Popup" style="background:white;border:5px;position:absolute; left:120px; top:20px; z-index:3; display: none;"><button style="width:100%" onclick="KnotMaker.ClosePopup(this)">Close</button><br/><form><textarea style="width:400px; height:200px;overflow:scroll;" id="KnotMaker-PopupText"></textarea></form></div>'+"\n";
//~         out += '<div style="overflow:scroll; height:400px ">';
        out += '<div>';
        out += KnotMaker.drawEditGrid(20,20);
        out += "</div></div>\n";
        return out;
    };

    KnotMaker.drawTileSidebar = function(){
//~ //http://billauer.co.il/blog/2009/04/css-div-layout-main-pitfalls-cascaded-style-sheets/
//~ var out = '<div style="border:1px solid green;position:absolute:x:0:y:0;overflow-x:scroll;z-index:1;">';
//~ var out = '<div style="border:1px solid green;">';
var out = '<div style="border-left:1px dashed;">';
//~ var out = '<layer style="border:1px solid green;position:absolute:x:0:y:0;overflow-x:scroll;zorder:1;">';
//~ out+='<div class="dropRight">';
//~ out += "<ul>\n";
//~ for(var i in KnotMaker.tileGroupings2 ){
//~     out += '<li>';
//~     out += '<a href="#">'+KnotMaker.tileGroupings2[i][0]+'</a>';
//~     out += "<ul >\n";

//~     for(var ix in KnotMaker.tileGroupings2[i][1] ){
//~         out += '<li>';
//~         out += '<a border=2 href="javascript:" onclick="KnotMaker.setTile(\''+KnotMaker.tiles[KnotMaker.tileGroupings2[i][1][ix]] +'\')">';
//~         out += '<img border=1 hspace=0 vspace=0 src="'+KnotMaker.tiles[KnotMaker.tileGroupings2[i][1][ix]]+'"';
//~         out+=' title=" '+KnotMaker.tileGroupings2[i][1][ix]+' '+KnotMaker.tiles[KnotMaker.tileGroupings2[i][1][ix]]+'"/>';
//~         out+='</a>';
//~         out += "</li>\n";
//~     }
//~     out += "</ul>\n";
//~     out += "</li>\n";
//~ }
//~ out += "</ul>\n";
//~ out += "</div>\n";

out+='<div class="dropRight">';
out += "<ul>\n";
for(var i in KnotMaker.ToolPanelList ){
    out += '<li>';
    out += '<a href="#" title="'+KnotMaker.ToolPanelList[i][0][1]+'">'+KnotMaker.ToolPanelList[i][0][0]+'</a>';
    out += "<ul >\n";

    for(var ix in KnotMaker.ToolPanelList[i][1] ){
        out += '<li>';
        out += '<a border=2 href="javascript:" onclick="KnotMaker.setTile(\''+KnotMaker.tiles[KnotMaker.ToolPanelList[i][1][ix]] +'\')">';
        out += '<img border=1 hspace=0 vspace=0 src="'+KnotMaker.tiles[KnotMaker.ToolPanelList[i][1][ix]]+'"';
        out+=' title=" '+KnotMaker.ToolPanelList[i][1][ix]+' '+KnotMaker.tiles[KnotMaker.ToolPanelList[i][1][ix]]+'"/>';
        out+='</a>';
        out += "</li>\n";
    }
    out += "</ul>\n";
    out += "</li>\n";
}
out += "</ul>\n";
out += "</div>\n";


out += "</div>\n";

//~ out += "</layer>\n";
return out;
    };


    KnotMaker.drawPredefined = function (){
        var out = "\n";
//~ out+='<hr style="width:60px;" align="left" /><div class="dropRight">';



//~ out+='<div class="dropRight">predefined<br/>';
//~ out+='<div class="dropRight"><ul><li>predefined';
//~ nowork out+='<div class="dropDown"><ul><li>predefined<div class="dropRight">';
//~ out+='predefined<br/><div style="visibility:hidden;" class="visibleInlineBlock">';
out+='predefined<br/><div class="dropRight">';
//~ out+='<div class="dropRight"><ul><li> predefined';
out+='<div class="dropRight">';
out += "<ul>\n";
for(var i in KnotMaker.predefinedKnotsList ){
    out += '<li>';
    out += '&nbsp; <a href="#">'+KnotMaker.predefinedKnotsList[i][0]+'</a>';
    out += "<ul >\n";

    for(var ix in KnotMaker.predefinedKnotsList[i][1] ){
        out+= '<li>';
        out+= '&nbsp; <a href="javascript:KnotMaker.LoadPredefined(document,\''+KnotMaker.predefinedKnotsList[i][1][ix]+'\');"> ';
        out+= KnotMaker.predefinedKnotsList[i][1][ix];
        out+= '</a>';
        out += "</li>\n";
    }
    out += "</ul>\n";
    out += "</li>\n";
}
out += "</ul>\n";
//~ out += "</div></li></ul>\n";
//~ out += "</div>\n";
//~ out+='<ul>';
//~ out+='<li><a href="#">predefined</a><ul>';
//~     for(var i in KnotMaker.predefinedKnots){
//~         out+='<li>';
//~         out+='<a href="javascript:KnotMaker.LoadPredefined(document,\''+i+'\');"> ';
//~         out+= i;
//~         out+= '</a> &nbsp;';
//~         out+= '</li> ';
//~     }
//~ out+= '</ul>';

out+= '</div>';
out+= '</div>';
out+= "\n";
return out;
    };

    KnotMaker.drawItWithTileSidebar= function(){
        var out = '<div class="KnotMaker" style="width:100%; height:100%">'+"\n";
out+= '<div id="KnotMaker-Popup" style="background:white;border:5px;position:absolute; left:120px; top:20px; z-index:3; display: none;"><button style="width:100%" onclick="KnotMaker.ClosePopup(this)">Close</button><br/><form><textarea style="width:400px; height:200px;overflow:scroll;" id="KnotMaker-PopupText"></textarea></form></div>'+"\n";

//~         out += '<div style="overflow:scroll; float:left; width: 100; overflow: float">';
//~         out+= '<div style="position:absolute; left:0px; top:0px; z-index:3;">';
//~ http://www.w3.org/Style/Examples/007/
//~ http://www.w3.org/Style/Examples/007/menus
//~ http://www.w3.org/Style/Examples/007/alternatives
//~ http://www.w3.org/Style/Examples/007/evenodd
//~ http://www.alistapart.com/articles/practicalcss/
        out+= '<div style="position:fixed; left:0px; top:0px; z-index:3;">';
        out+= '<div style="border:1px dashed;width:110px;background:#eeeeee;text-align:center;">current tile<br/>';
        out+= '<img id="KnotMaker-currentTileStatusImg" vspace=0 hspace=0 src="'+KnotMaker.tiles[KnotMaker.currentTile]+'"/>';
        out+= '<div id="KnotMaker-currentTileStatusDiv">\'a\' (97) </div>';
        out+= '</div>';
        out+= '<hr style="width:60px;" align="left" />';
        out+= "\n";
//~         out += '<div style="height:100%; width:10; flow:left; overflow:scroll;z-index:1;">';
out += '<div width="100px" style="width:100px;">';//100px
out += KnotMaker.drawToolBar2();
out += "</div>\n";

        out+='<hr style="width:60px;" align="left" />';
out += KnotMaker.drawTileSidebar();

        out+='<hr style="width:60px;" align="left" />';
        out += KnotMaker.drawPredefined();
        out += "</div>\n";
    out += '<div id="right" style="padding-left:100px;">';//100px
    out += KnotMaker.drawEditGrid(20,20);
    out += "</div>\n";
        out += "</div></div>\n";
        return out;
    };



    KnotMaker.drawItWithTileSidebar2= function(){
var out = '<div class="KnotMaker" style="width:100%; height:100%">'+"\n";
out+= '<div id="KnotMaker-Popup" style="background:white;border:5px;position:absolute; left:120px; top:20px; z-index:3; display: none;"><button style="width:100%" onclick="KnotMaker.ClosePopup(this)">Close</button><br/><form><textarea style="width:400px; height:200px;overflow:scroll;" id="KnotMaker-PopupText"></textarea></form></div>'+"\n";
out+= '<div style="position:fixed; left:0px; top:0px; z-index:3;">';
out+= '<div style="border:1px dashed;width:110px;background:#eeeeee;text-align:center;">current tile<br/>';
out+= '<img id="KnotMaker-currentTileStatusImg" vspace=0 hspace=0 src="'+KnotMaker.tiles[KnotMaker.currentTile]+'"/>';
out+= '<div id="KnotMaker-currentTileStatusDiv">\'a\' (97) </div>';
out+= '</div>';
out+= "\n";



out+= "<div class=\"menu2RightDown\" style=\"margin:0;padding:0\">\n";
out+= "<ul class=\"menu2DropDown menu2RightDown \" style=\"margin:0;padding:0\">\n";
//~ out+= KnotMaker.drawToolBar2();
//~ out+= "<li class=\"menu2Trigger\"><a href=\"#\">File</a>\n";
out+= "<li class=\"menu2Trigger\"><a >File</a>\n";
    out+= "<ul class=\"menu2 menu2DropDown menu2Li\" style=\"position:absolute;display:inline;\">\n";
        out+= '<li><a href="javascript:KnotMaker.LoadPromptKb(this)">load</a>'+"</li>\n";
//~         out+= '<li  class=\"menu2Trigger\"><a href=\"#\">SAVE</a>';
        out+= '<li  class=\"menu2Trigger\"><a >SAVE</a>';
        out+= "<ul class=\"menu2 menu2DropRight menu2Li\" style=\"position:absolute;display:inline;\">\n";
        out+= '<li><a href="javascript:KnotMaker.SavePromptKb(this)">PromptKb</a></li> ';
        out+= '<li><a href="javascript:KnotMaker.SavePromptKbJSON(this)">PromptJSON</a></li> ';
        out+= '<li><a href="javascript:KnotMaker.SaveWriteKm(this)">WriteKm</a></li> ';
        out+= '<li><a href="javascript:KnotMaker.SaveWriteKmJSON(this)">WriteJSON</a></li> ';
        out+= "</ul>";
        out+= '</li>';
        out+= '<li>'+'<a href="javascript:KnotMaker.clearAllGrid(this)">CLEAR ALL</a>'+"</li>\n";
        out+= '<li>'+ '<a href="javascript:KnotMaker.about()">about</a>' +"</li>\n";
        out+= "\n";
    out+= "</li>\n";
    out+= "</ul>\n";
out+= "</li>\n";

//~ out+= KnotMaker.drawTileSidebar();
//~     out+= "<li class=\"menu2Trigger\">\n<a href=\"#\">Tool panel</a>\n";
    out+= "<li class=\"menu2Trigger\">\n<a >Tool panel</a>\n";
    out+= "<ul class=\"menu2 menu2DropDown menu2Li\" style=\"position:absolute;display:inline;\">\n";
for(var i in KnotMaker.ToolPanelList ){
//~     out+= "<li class=\"menu2Trigger\">\n<a href=\"#\"";
    out+= "<li class=\"menu2Trigger\">\n<a ";
    out+= ' title="'+KnotMaker.ToolPanelList[i][0][1]+'">'+KnotMaker.ToolPanelList[i][0][0];
    out+="</a>\n";
    out+="<ul class=\"menu2 menu2DropRight menu2Li\" style=\"position:absolute;display:inline;\">\n";
    for(var ix in KnotMaker.ToolPanelList[i][1] ){
        var tileidtip = "'"+KnotMaker.ToolPanelList[i][1][ix]+'\' '+'('+ KnotMaker.ToolPanelList[i][1][ix].charCodeAt(0) +') ' ;
        out += '<li>';
        out += '<a border=2 href="javascript:KnotMaker.setTile(\''+KnotMaker.tiles[KnotMaker.ToolPanelList[i][1][ix]] +'\')">';
        out += tileidtip + '<br/>';
        out += '<img border=1 hspace=0 vspace=0 src="'+KnotMaker.tiles[KnotMaker.ToolPanelList[i][1][ix]]+'"';
        out+=' title="'+tileidtip+KnotMaker.tiles[KnotMaker.ToolPanelList[i][1][ix]]+'"/>';
        out+='</a>';
        out += "</li>\n";
    }
    out += "</ul>\n";
    out += "</li>\n";
}
    out += "</ul>\n";
    out+= "</li>\n";


//out+= KnotMaker.drawPredefined();
//~     out+= "<li class=\"menu2Trigger\">\n<a href=\"#\">Predefined</a>\n";
    out+= "<li class=\"menu2Trigger\">\n<a >Predefined</a>\n";
    out+= "<ul class=\"menu2 menu2DropDown menu2Li\" style=\"position:absolute;display:inline;\">\n";
for(var i in KnotMaker.predefinedKnotsList ){
//~     out+= "<li class=\"menu2Trigger\">\n<a href=\"#\">";
    out+= "<li class=\"menu2Trigger\">\n<a >";
    out += KnotMaker.predefinedKnotsList[i][0]+"</a>\n";
    out+="<ul class=\"menu2 menu2DropRight menu2Li\" style=\"position:absolute;display:inline;\">\n";

    for(var ix in KnotMaker.predefinedKnotsList[i][1] ){
        out+= '<li>';
        out+= '<a href="javascript:KnotMaker.LoadPredefined(document,\''+KnotMaker.predefinedKnotsList[i][1][ix]+'\');"> ';
        out+= KnotMaker.predefinedKnotsList[i][1][ix];
        out+= '</a>';
        out += "</li>\n";
    }
    out += "</ul>\n";
    out += "</li>\n";
}
out += "</ul>\n";

out+= "</ul>\n"; // side menu
out+= "</div>\n"; // side menu

out+= "</div>\n";
    out+= '<div id="right" style="padding-left:100px;">';//100px
out+= KnotMaker.drawEditGrid(20,20);
    out+= "</div>\n";
out+= "</div>\n";
out+= "</div>\n";
        return out;
    };

    KnotMaker.about = function(){KnotMaker.alert('jsKnotMaker v'+KnotMaker.VERSION);return false;}

//~ document.write(KnotMaker.drawIt());
//~ document.write(KnotMaker.drawItWithTileSidebar());
document.title = "jsKnotMaker v"+KnotMaker.VERSION;

return;
}());//the end
