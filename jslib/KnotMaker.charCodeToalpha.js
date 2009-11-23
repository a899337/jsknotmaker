//~ jslib/KnotMaker.charCodeToalpha.js
//~ defines
//~     KnotMaker.charCodeToalpha
//~     KnotMaker.aIx
//~     KnotMaker.xIa 
//~ 
//~ encoding: UTF-8 Unicode (with BOM)

if (!this.KnotMaker) {
    this.KnotMaker = {};
} (function () {
//~ 2009-11-03- 08:15:01 for high-bits (which i didn't test), firefox does
//~ encoding conversion, "\x99" becomes charcode 8482
//~ now you can copy directly from .km files and paste into load prompt
//~ HOPEFULLY
//~ OFCOURSE, saving from jsKnotMaker FOR KnotMaker  doesn't work yet

    KnotMaker.charCodeToalpha = {
        "":"", // jic
        "NaN":"",
        "97":"a",
        "98":"b",
        "99":"c",
        "100":"d",
        "101":"e",
        "102":"f",
        "103":"g",
        "104":"h",
        "105":"i",
        "106":"j",
        "107":"k",
        "108":"l",
        "109":"m",
        "110":"n",
        "111":"o",
        "112":"p",
        "113":"q",
        "114":"r",
        "115":"s",
        "116":"t",
        "117":"u",
        "118":"v",
        "119":"w",
        "120":"x",
        "121":"y",
        "122":"z",
        "123":"{",
        "124":"|",
        "125":"}",
        "126":"~",

//~ #~ $ perl -le"printf qq!\x22%d\x22:\x22\\x%2x\x22,\n!,$_,$_ for 127 .. 154"
        "127":"\x7f",
        "128":"\x80",
        "129":"\x81",
        "130":"\x82",
        "131":"\x83",
        "132":"\x84",
        "133":"\x85",
        "134":"\x86",
        "135":"\x87",
        "136":"\x88",
        "137":"\x89",
        "138":"\x8a",
        "139":"\x8b",
        "140":"\x8c",
        "141":"\x8d",
        "142":"\x8e",
        "143":"\x8f",
        "144":"\x90",
        "145":"\x91",
        "146":"\x92",
        "147":"\x93",
        "148":"\x94",
        "149":"\x95",
        "150":"\x96",
        "151":"\x97",
        "152":"\x98",
        "153":"\x99",
        "154":"\x9a",

        "338": "\x8c",
        "353": "\x9a",
        "381": "\x8e",
        "402": "\x83",
        "710": "\x88",
        "732": "\x98",
        "8211": "\x96",
        "8212": "\x97",
        "8216": "\x91",
        "8217": "\x92",
        "8218": "\x82",
        "8220": "\x93",
        "8221": "\x94",
        "8222": "\x84",
        "8224": "\x86",
        "8225": "\x87",
        "8226": "\x95",
        "8230": "\x85",
        "8240": "\x89",
        "8364": "\x80",
        "8482": "\x99",
    };


//~ $ perl -le" printf qq!\x22$_\x22: %d,\n!,$i++ for a..z"
    KnotMaker.aIx = {
        "a": 0,
        "b": 1,
        "c": 2,
        "d": 3,
        "e": 4,
        "f": 5,
        "g": 6,
        "h": 7,
        "i": 8,
        "j": 9,
        "k": 10,
        "l": 11,
        "m": 12,
        "n": 13,
        "o": 14,
        "p": 15,
        "q": 16,
        "r": 17,
        "s": 18,
        "t": 19,
        "u": 20,
        "v": 21,
        "w": 22,
        "x": 23,
        "y": 24,
        "z": 25
    };
//~ $ perl -le" printf qq!%d: \x22$_\x22,\n!,$i++ for a..z"
    KnotMaker.xIa = {
        0: "a",
        1: "b",
        2: "c",
        3: "d",
        4: "e",
        5: "f",
        6: "g",
        7: "h",
        8: "i",
        9: "j",
        10: "k",
        11: "l",
        12: "m",
        13: "n",
        14: "o",
        15: "p",
        16: "q",
        17: "r",
        18: "s",
        19: "t",
        20: "u",
        21: "v",
        22: "w",
        23: "x",
        24: "y",
        25: "z"
    };

//~ // jic
    if (KnotMaker.tiles) {
//~         KnotMaker.alert("charcodetiles");
        for (var k in KnotMaker.tiles) {
            var ck = k.charCodeAt(0);
            if (!KnotMaker.charCodeToalpha[ck]) {
                KnotMaker.charCodeToalpha[ck] = k;
            }
        }
    }
} ()); //the end