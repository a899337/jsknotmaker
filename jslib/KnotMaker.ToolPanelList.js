//~ jslib/KnotMaker.ToolPanelList.js
//~ 
//~ encoding: UTF-8 Unicode (with BOM)

if (!this.KnotMaker) {
    this.KnotMaker = {};
}
(function () {
var crossing = "A 'Crossing' tile has a 'Main' section of rope which crosses over the 'Behind' section of rope" ;
KnotMaker.ToolPanelList = [
  [ ["###", "Miscellaneous (blank)" ],
    ["","q","r","" ],
  ],
  [ ["Working End", "Every rope must have one 'Working End' (i.e. 'tail end')" ],
    ["d","a","b","c" ],
  ],
  [ ["Standing Part", "The arrow shows the direction in which the main part of the rope is traveling" ],
    ["n","p","o","m" ],
  ],
  [ ["Straight", "" ],
    ["f","e","\x7F","~" ],
  ],
  [ ["Curve", "" ],
    ["i","j","l","k","u","v","y","z" ],
  ],
  [ ["Elbow", "" ],
    ["\x83","\x87","\x84","\x8C","\x85","\x8D","\x82","\x86" ],
  ],
  [ ["Straight Crossings", crossing ],
    ["h","g","\x80","\x81" ],
  ],
  [ ["Angle Crossings", crossing ],
    ["{","|","}","\x8E","\x8F","\x90","\x91","\x92" ],
  ],
  [ ["Elbow Crossings", crossing ],
    ["\x96","\x97","\x98","\x99","\x9A","\x93","\x94","\x95" ],
  ],
  [ ["Spar/Pole", "Use this for tying a knot around a pole" ],
    ["s","t","\x88","\x89","w","x","\x8A","\x8B" ],
  ],
];


}());//the end

