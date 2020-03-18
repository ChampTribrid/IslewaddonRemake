// ==UserScript==
// @name         Rune info for IWD 0.3.2 
// @version      1
// @description  Add rune info in-game
// @author       Polfy's
// @match        https://play.isleward.com/
//Thxs to qndel : https://github.com/qndel/IslewardAddonBundle/blob/master/expandedrunedescriptions.js
// ==/UserScript== 

var objRunes;

let runes = {
    'magic missile': {
        statType: 'int',
        random: {
            damage: [4, 15]
        }
    },
    'ice spear': {
        statType: 'int',
        random: {
            damage: [2, 8],
            i_freezeDuration: [6, 10]
        }
    },
    fireblast: {
        statType: 'int',
        random: {
            damage: [2, 5],
            i_radius: [1, 2.2],
            i_pushback: [2, 5]
        }
    },
    smite: {
        statType: 'int',
        random: {
            damage: [4, 14],
            i_stunDuration: [6, 10]
        }
    },
    consecrate: {
        statType: 'int',
        random: {
            healing: [0.3, 0.5],
            i_duration: [7, 13]
        }
    },

    slash: {
        statType: 'str',
        random: {
            damage: [6, 23]
        }
    },
    charge: {
        statType: 'str',
        random: {
            damage: [2, 8],
            i_stunDuration: [6, 10]
        }
    },
    flurry: {
        statType: 'none',
        random: {
            i_duration: [4, 9]
        }
    },
    smokebomb: {
        statType: 'dex',
        random: {
            damage: [0.25, 1.45],
            i_radius: [1, 3],
            i_duration: [7, 13]
        }
    },
    'crystal spikes': {
        statType: ['dex', 'int'],
        random: {
            damage: [3, 14],
            i_delay: [1, 4]
        },
        negativeStats: [
            'i_delay'
        ]
    },
    innervation: {
        statType: ['none'],
        random: {
            regenPercentage: [0.3, 1.5]
        }
    },
    tranquility: {
        statType: ['none'],
        random: {
            regenPercentage: [4, 10]
        }
    },
    swiftness: {
        statType: ['none'],
        random: {
            chance: [5, 10]
        }
    },

    'harvest life': {
        statType: ['str', 'int'],
        random: {
            damage: [4, 14],
            healPercent: [10, 30]
        }
    },

    'summon skeleton': {
        statType: ['str', 'int'],
        random: {
            damagePercent: [20, 76],
            hpPercent: [40, 60]
        }
    },

     'blood barrier': {
         statType: ['str', 'int'],
         random: {
             i_drainPercentage: [10, 50],
             shieldMultiplier: [2, 5],
             i_frenzyDuration: [5, 15]
         }
    }
};

addons.register({
    init: function(events) {
        events.on('onShowItemTooltip', this.onShowItemTooltip.bind(this));
        events.on('onBuiltItemTooltip', this.onBuiltItemTooltip.bind(this));
    },
    onShowItemTooltip: function(obj) {
        objRunes = obj;
    },
    onBuiltItemTooltip: function(obj) {
        expandRuneTooltip(objRunes);
    },
});
function expandRuneTooltip(obj) {
    if(obj.ability === true){
        var name = obj.spell.name.toLowerCase();
        var txt;
        if(Array.isArray(runes[name].statType) == true){
            txt = runes[name].statType.map(x => "<font color='orange'>"+x+"</font>");
        } else{
            txt = "<font color='orange'>"+runes[name].statType+"</font>";
        }
        var newText = "Benefits from stats: ["+txt+"]<br>";
        Object.keys(obj.spell.values).forEach(function(key) {
            var minmax;
            if(key in runes[name].random){
                minmax = runes[name].random[key];
            } else{
                minmax = runes[name].random["i_"+key];
            }
            var maxrange = minmax[1]-minmax[0];
            var currange = obj.spell.values[key]-minmax[0];
            var runestartcolor = {r:255,g:0,b:0};
            var runeendcolor = {r:0,g:255,b:0};
            var r = runestartcolor.r + (runeendcolor.r-runestartcolor.r)*currange/maxrange;
            var g = runestartcolor.g + (runeendcolor.g-runestartcolor.g)*currange/maxrange;
            var b = runestartcolor.b + (runeendcolor.b-runestartcolor.b)*currange/maxrange;
            var runecolor = "rgb("+r+","+g+","+b+")";
            newText += key + ": <font style='color:"+runecolor+";'>" + obj.spell.values[key] + "</font>  [<font style='color:rgb("+runestartcolor.r+","+runestartcolor.g+","+runestartcolor.b+");'>"+minmax[0] +"</font>-<font style='color:rgb("+runeendcolor.r+","+runeendcolor.g+","+runeendcolor.b+");'>"+minmax[1]+"</font>]<br>";
        });
        $(".uiTooltipItem .tooltip .damage").eq(0).html(newText);
    }
}
