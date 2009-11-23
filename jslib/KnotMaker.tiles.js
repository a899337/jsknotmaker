//~ jslib/KnotMaker.tiles.js
//~ defines
//~     KnotMaker.tiles
//~     KnotMaker.tilesReverse
//~     Knotmaker.shallowReverse(o)
//~ 
//~ encoding: UTF-8 Unicode (with BOM)

if (!this.KnotMaker) {
    this.KnotMaker = {};
} (function () {

    var tiles50 = {

        '': "tiles/50x50/0.gif",
        'a': "tiles/50x50/97.gif",
        'b': "tiles/50x50/98.gif",
        'c': "tiles/50x50/99.gif",
        'd': "tiles/50x50/100.gif",
        'e': "tiles/50x50/101.gif",
        'f': "tiles/50x50/102.gif",
        'g': "tiles/50x50/103.gif",
        'h': "tiles/50x50/104.gif",
        'i': "tiles/50x50/105.gif",
        'j': "tiles/50x50/106.gif",
        'k': "tiles/50x50/107.gif",
        'l': "tiles/50x50/108.gif",
        'm': "tiles/50x50/109.gif",
        'n': "tiles/50x50/110.gif",
        'o': "tiles/50x50/111.gif",
        'p': "tiles/50x50/112.gif",
        'q': "tiles/50x50/113.gif",
        'r': "tiles/50x50/114.gif",
        's': "tiles/50x50/115.gif",
        't': "tiles/50x50/116.gif",
        'u': "tiles/50x50/117.gif",
        'v': "tiles/50x50/118.gif",
        'w': "tiles/50x50/119.gif",
        'x': "tiles/50x50/120.gif",
        'y': "tiles/50x50/121.gif",
        'z': "tiles/50x50/122.gif",

        "{": "tiles/50x50/123.gif",
        '|': "tiles/50x50/124.gif",
        "}": "tiles/50x50/125.gif",
        '~': "tiles/50x50/126.gif",

        "\x7F": "tiles/50x50/127.gif",
        "\x80": "tiles/50x50/128.gif",
        "\x81": "tiles/50x50/129.gif",
        "\x82": "tiles/50x50/130.gif",
        "\x83": "tiles/50x50/131.gif",
        "\x84": "tiles/50x50/132.gif",
        "\x85": "tiles/50x50/133.gif",
        "\x86": "tiles/50x50/134.gif",
        "\x87": "tiles/50x50/135.gif",
        "\x88": "tiles/50x50/136.gif",
        "\x89": "tiles/50x50/137.gif",
        "\x8A": "tiles/50x50/138.gif",
        "\x8B": "tiles/50x50/139.gif",
        "\x8C": "tiles/50x50/140.gif",
        "\x8D": "tiles/50x50/141.gif",
        "\x8E": "tiles/50x50/142.gif",
        "\x8F": "tiles/50x50/143.gif",
        "\x90": "tiles/50x50/144.gif",
        "\x91": "tiles/50x50/145.gif",
        "\x92": "tiles/50x50/146.gif",
        "\x93": "tiles/50x50/147.gif",
        "\x94": "tiles/50x50/148.gif",
        "\x95": "tiles/50x50/149.gif",
        "\x96": "tiles/50x50/150.gif",
        "\x97": "tiles/50x50/151.gif",
        "\x98": "tiles/50x50/152.gif",
        "\x99": "tiles/50x50/153.gif",
        "\x9A": "tiles/50x50/154.gif",
    };


    var tiles15 = {

        '': "tiles/15x15/0.gif",
        'a': "tiles/15x15/97.gif",
        'b': "tiles/15x15/98.gif",
        'c': "tiles/15x15/99.gif",
        'd': "tiles/15x15/100.gif",
        'e': "tiles/15x15/101.gif",
        'f': "tiles/15x15/102.gif",
        'g': "tiles/15x15/103.gif",
        'h': "tiles/15x15/104.gif",
        'i': "tiles/15x15/105.gif",
        'j': "tiles/15x15/106.gif",
        'k': "tiles/15x15/107.gif",
        'l': "tiles/15x15/108.gif",
        'm': "tiles/15x15/109.gif",
        'n': "tiles/15x15/110.gif",
        'o': "tiles/15x15/111.gif",
        'p': "tiles/15x15/112.gif",
        'q': "tiles/15x15/113.gif",
        'r': "tiles/15x15/114.gif",
        's': "tiles/15x15/115.gif",
        't': "tiles/15x15/116.gif",
        'u': "tiles/15x15/117.gif",
        'v': "tiles/15x15/118.gif",
        'w': "tiles/15x15/119.gif",
        'x': "tiles/15x15/120.gif",
        'y': "tiles/15x15/121.gif",
        'z': "tiles/15x15/122.gif",

        "{": "tiles/15x15/123.gif",
        '|': "tiles/15x15/124.gif",
        "}": "tiles/15x15/125.gif",
        '~': "tiles/15x15/126.gif",

        "\x7F": "tiles/15x15/127.gif",
        "\x80": "tiles/15x15/128.gif",
        "\x81": "tiles/15x15/129.gif",
        "\x82": "tiles/15x15/130.gif",
        "\x83": "tiles/15x15/131.gif",
        "\x84": "tiles/15x15/132.gif",
        "\x85": "tiles/15x15/133.gif",
        "\x86": "tiles/15x15/134.gif",
        "\x87": "tiles/15x15/135.gif",
        "\x88": "tiles/15x15/136.gif",
        "\x89": "tiles/15x15/137.gif",
        "\x8A": "tiles/15x15/138.gif",
        "\x8B": "tiles/15x15/139.gif",
        "\x8C": "tiles/15x15/140.gif",
        "\x8D": "tiles/15x15/141.gif",
        "\x8E": "tiles/15x15/142.gif",
        "\x8F": "tiles/15x15/143.gif",
        "\x90": "tiles/15x15/144.gif",
        "\x91": "tiles/15x15/145.gif",
        "\x92": "tiles/15x15/146.gif",
        "\x93": "tiles/15x15/147.gif",
        "\x94": "tiles/15x15/148.gif",
        "\x95": "tiles/15x15/149.gif",
        "\x96": "tiles/15x15/150.gif",
        "\x97": "tiles/15x15/151.gif",
        "\x98": "tiles/15x15/152.gif",
        "\x99": "tiles/15x15/153.gif",
        "\x9A": "tiles/15x15/154.gif",
    };


    KnotMaker.tiles = tiles50;
    KnotMaker.tileWidth = 50;
    KnotMaker.tileHeight = 50;
//~     KnotMaker.tiles = tiles15;
//~     KnotMaker.tileWidth = 15;
//~     KnotMaker.tileHeight = 15;
    KnotMaker.shallowReverse = function(o) {
        var n = {};
        for (var i in o) {
            n[o[i]] = i;
        }
        return n
    }
    KnotMaker.tilesReverse = KnotMaker.shallowReverse(KnotMaker.tiles);
    

} ()); //the end


