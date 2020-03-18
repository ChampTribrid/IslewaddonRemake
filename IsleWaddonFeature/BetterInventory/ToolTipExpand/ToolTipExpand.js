// RUNE DATA
window.getScript("https://"+window.IsleWaddonVersion+"/IsleWaddonFeature/BetterInventory/ToolTipExpand/RuneData.js");

String.prototype.replaceAll = String.prototype.replaceAll || function(string, replaced) {
return this.replace(new RegExp(string, 'g'), replaced);
};

var objToExpand = -1;
var colorTooltip;
var text;
var numberOfStat;
var weaponMult = 1;
var rangeDmg;
var rangeArmor;

addons.register({
    init: function(events) {
        events.on('onShowItemTooltip', this.onShowItemTooltip.bind(this));
        events.on('onHideItemTooltip', this.onHideItemTooltip.bind(this));
        events.on('onBuiltItemTooltip', this.onBuiltItemTooltip.bind(this));
    },

    onShowItemTooltip: function(obj) {
        objToExpand = obj;
    },

    onHideItemTooltip: function() {
        objToExpand = -1;
    },

    onBuiltItemTooltip: function() {
        itemType(objToExpand);
    }
})

// SELECT TYPE
function itemType(obj){
    if(obj.quality == 0) {colorTooltip = "white"; numberOfStat = " non-augmented stat";}
    else {
        numberOfStat = " non-augmented stats";
        if(obj.quality == 1) {colorTooltip = "#4ac441";}
        else if(obj.quality == 2) {colorTooltip = "#3fa7dd";}
        else if(obj.quality == 3) {colorTooltip = "#a24eff";}
        else if(obj.quality == 4) {colorTooltip = "#ff6942";}
    }
    numberOfStat = (obj.quality+1)+numberOfStat;
    if(obj.type == "Fishing Rod" && obj.name != "Competition Rod" && obj.name != "Flimsy Fishing Rod"){
        expandFishingRodTooltip(obj);
    }else if(obj.ability != true && obj.level) {
        expandItemStats(obj);
    }else if(obj.ability == true) {
        expandRuneTooltip(obj);
    }else if(obj.type == "Reward Card") {
        expandRewardCardTooltip(obj);
    }
}

// GEAR
function expandItemStats(obj) {
    // IMPLICITS STATS
    if(window.StatsRangeSTATUS == "true") {
        $('.uiTooltipItem .tooltip .implicitStats').each(function() {
            text = $(this).html();
            if(obj.type == "Breastplate") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Helmet" ||obj.type == "Legplates") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Gauntlets" || obj.type == "Steel Boots") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Leather Armor" || obj.type == "Scalemail") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Leather Cap" || obj.type == "Facemask" || obj.type == "Leather Pants" || obj.type == "Scale Leggings") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Leather Gloves" || obj.type == "Scale Gloves" || obj.type == "Leather Boots" || obj.type == "Scale Boots") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Robe") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Cowl" || obj.type == "Pants") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Gloves" || obj.type == "Boots") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Pendant") {
                $(this).html(text.replace("strenght", "strenght <font color="+colorTooltip+">[1-4]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Amulet") {
                $(this).html(text.replace("intellect", "intellect <font color="+colorTooltip+">[1-4]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Locket") {
                $(this).html(text.replace("dexterity", "dexterity <font color="+colorTooltip+">[1-4]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Choker") {
                $(this).html(text.replace("health regeneration", "health regeneration <font color="+colorTooltip+">[2-5]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Signet") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+">[5-15]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Ring") {
                $(this).html(text.replace("mana regeneration", "mana regeneration <font color="+colorTooltip+">[1-5]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Loop") {
                $(this).html(text.replace("to all attributes", "to all attributes <font color="+colorTooltip+">[1-7]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Viridian Band") {
                $(this).html(text.replace("increased physical damage", "increased physical damage <font color="+colorTooltip+">[1-3]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Belt") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+">[10-20]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Sash") {
                $(this).html(text.replace("maximum mana", "maximum mana <font color="+colorTooltip+">[1-8]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Leather Belt") {
                $(this).html(text.replace("global crit chance", "global crit chance <font color="+colorTooltip+">[0.5-2.5]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Scaled Binding") {
                $(this).html(text.replace("vitality", "vitality <font color="+colorTooltip+">[2-6]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Forged Ember") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+">[25-70]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Smokey Orb") {
                $(this).html(text.replace("chance to dodge attacks", "chance to dodge attacks <font color="+colorTooltip+">[1-3]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Quartz Fragment") {
                $(this).html(text.replace("increased arcane damage", "increased arcane damage <font color="+colorTooltip+">[3-12]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Mystic Card") {
                $(this).html(text.replace("increased item quality", "Increased item quality <font color="+colorTooltip+">[3-12]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Dragon Fang") {
                $(this).html(text.replace("attack speed", "attack speed <font color="+colorTooltip+">[1-5]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Sword") {
                $(this).html(text.replace("attack speed", "attack speed <font color="+colorTooltip+">[1-5]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Axe") {
                $(this).html(text.replace("attack crit multiplier", "attack crit multiplier <font color="+colorTooltip+">[10-30]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Wand") {
                $(this).html(text.replace("cast speed", "cast speed <font color="+colorTooltip+">[1-5]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Gnarled Staff") {
                $(this).html(text.replace("mana regeneration", "mana regeneration <font color="+colorTooltip+">[3-9]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Dagger") {
                $(this).html(text.replace("attack crit chance", "attack crit chance <font color="+colorTooltip+">[0.5-2.5]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Spear") {
                $(this).html(text.replace("chance to dodge attacks", "chance to dodge attacks <font color="+colorTooltip+">[1-7]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Wooden Shield") {
                $(this).html(text.replace("chance to block attacks", "chance to block attacks <font color="+colorTooltip+">[1-10]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Gilded Shield") {
                $(this).html(text.replace("chance to block attacks", "chance to block attacks <font color="+colorTooltip+">[1-5]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Brittle Tome") {
                $(this).html(text.replace("spell crit chance", "spell crit chance <font color="+colorTooltip+">[0.5-2.5]<br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Ancient Tome") {
                $(this).html(text.replace("spell crit multiplier", "spell crit multiplier <font color="+colorTooltip+">[10-30]<br>+"+numberOfStat+"</font>"));
            }
        });
        // HACK FOR OLD/LEGACY ARMOR GEAR
        $('.uiTooltipItem .tooltip .stats').each(function() {
            text = $(this).html();
            if(obj.type == "Breastplate") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Helmet" ||obj.type == "Legplates") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Gauntlets" || obj.type == "Steel Boots") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Leather Armor" || obj.type == "Scalemail") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Leather Cap" || obj.type == "Facemask" || obj.type == "Leather Pants" || obj.type === "Scale Leggings") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Leather Gloves" || obj.type == "Scale Gloves" || obj.type == "Leather Boots" || obj.type === "Scale Boots") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Robe") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Cowl" || obj.type == "Pants") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            } else if(obj.type == "Gloves" || obj.type == "Boots") {
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+"><br>+"+numberOfStat+"</font>"));
            }
        });
        // LVL 20 GEAR STATS
        if(obj.level == 20 || obj.originalLevel == 20 || (obj.level+obj.stats.lvlRequire) == 20) {
            if(obj.slot == "twoHanded") {weaponMult = 2}
            else {weaponMult = 1}
            // DAMAGE
            if(obj.slot == "twoHanded" || obj.slot == "oneHanded") {
                if(obj.type == "Trident") {rangeDmg = "[1.65-10.81]";}
                else if(obj.type == "Sword") {rangeDmg = "[1.47-9.65]";}
                else if(obj.type == "Dagger") {rangeDmg = "[0.88-5.79]";}
                else if(obj.type == "Wand") {rangeDmg = "[1.17-7.72]";}
                else if(obj.type == "Axe") {rangeDmg = "[2.64-17.37]";}
                else if(obj.type == "Gnarled Staff") {rangeDmg = "[1.65-10.81]";}
                else if(obj.type == "Spear") {rangeDmg = "[1.76-11.58]";}
                else if(obj.type == "Curved Dagger") {rangeDmg = "[0.88-5.79]";}
                else if(obj.type == "Sickle" || obj.type == "Jade Sickle" || obj.type == "Golden Sickle" || obj.type == "Bone Sickle") {rangeDmg = "[1.5-5.7]";}
                $('.uiTooltipItem .tooltip .damage').each(function() {
                    text = $(this).html();
                    $(this).html(text.replace("damage", "<font color='white'>"+rangeDmg+"</font> damage"));
                });
            }
            // IMPLICIT ARMOR
            if(obj.type == "Breastplate") {rangeArmor = "[160-400]";}
            else if(obj.type == "Helmet" ||obj.type == "Legplates") {rangeArmor = "[80-200]";}
            else if(obj.type == "Gauntlets" || obj.type == "Steel Boots") {rangeArmor = "[40-100]";}
            else if(obj.type == "Leather Armor" || obj.type == "Scalemail") {rangeArmor = "[96-240]";}
            else if(obj.type == "Leather Cap" ||obj.type == "Facemask" || obj.type == "Leather Pants" || obj.type == "Scale Leggings") {rangeArmor = "[48-120]";}
            else if(obj.type == "Leather Gloves" || obj.type == "Scale Gloves" || obj.type == "Leather Boots" || obj.type == "Scale Boots") {rangeArmor = "[24-60]";}
            else if(obj.type == "Robe") {rangeArmor = "[56-140]";}
            else if(obj.type == "Cowl" ||obj.type == "Pants") {rangeArmor = "[28-70]";}
            else if(obj.type == "Gloves" || obj.type == "Boots") {rangeArmor = "[14-35]";}
            else if(obj.type == "Wooden Shield") {rangeArmor = "[120-300]";}
            else if(obj.type == "Gilded Shield") {rangeArmor = "[240-600]";}
            $('.uiTooltipItem .tooltip .implicitStats').each(function() {
                text = $(this).html();
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+">"+rangeArmor+"</font>"));
            });
            // HACK FOR OLD ARMOR GEAR
            $('.uiTooltipItem .tooltip .stats').each(function() {
                text = $(this).html();
                $(this).html(text.replace("armor", "armor <font color="+colorTooltip+">"+rangeArmor+"</font>"));
            });
            // STATS
            $('.uiTooltipItem .tooltip .stats').each(function() {
                text = $(this).html();
                $(this).html(text.replaceAll("intellect", "intellect <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("dexterity", "dexterity <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("strength", "strength <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("to all attributes", "to all attributes <font color="+colorTooltip+">[1-10]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("global crit chance", "global crit chance <font color="+colorTooltip+">[0.05-"+3.9*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("global crit multiplier", "global crit multiplier <font color="+colorTooltip+">[1-"+28*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("attack crit chance", "attack crit chance <font color="+colorTooltip+">[0.05-"+3.9*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("attack crit multiplier", "attack crit multiplier <font color="+colorTooltip+">[1-"+28*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("spell crit chance", "spell crit chance <font color="+colorTooltip+">[0.05-"+3.9*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("spell crit multiplier", "spell crit multiplier <font color="+colorTooltip+">[1-"+28*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("increased item quality", "increased item quality <font color="+colorTooltip+">[1-15]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("increased item quantity", "increased item quantity <font color="+colorTooltip+">[2-27]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("additional xp per kill", "additional xp per kill <font color="+colorTooltip+">[1-6]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("level requirement reduction", "level requirement reduction <font color="+colorTooltip+">[1-10]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("vitality", "vitality <font color="+colorTooltip+">[1-"+7*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("health regeneration", "health regeneration <font color="+colorTooltip+">[1-"+14*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("maximum mana", "maximum mana <font color="+colorTooltip+">[1-8]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("mana regeneration", "mana regeneration <font color="+colorTooltip+">[1-5]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("arcane resistance", "arcane resistance <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("fire resistance", "fire resistance <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("frost resistance", "frost resistance <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("holy resistance", "holy resistance <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("poison resistance", "poison resistance <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("all resistance", "all resistance <font color="+colorTooltip+">[1-"+10*weaponMult+"]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("increased arcane damage", "increased arcane damage <font color="+colorTooltip+">[1-3]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("increased frost damage", "increased frost damage <font color="+colorTooltip+">[1-3]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("increased fire damage", "increased fire damage <font color="+colorTooltip+">[1-3]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("increased holy damage", "increased holy damage <font color="+colorTooltip+">[1-3]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("increased poison damage", "increased poison damage <font color="+colorTooltip+">[1-3]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("increased elemental damage", "increased elemental damage <font color="+colorTooltip+">[1-3]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("increased spell damage", "increased spell damage <font color="+colorTooltip+">[1-3]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("increased physical damage", "increased physical damage <font color="+colorTooltip+">[1-3]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("cast speed", "cast speed <font color="+colorTooltip+">[1-8.75]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("attack speed", "attack speed <font color="+colorTooltip+">[1-8.75]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("sprint chance", "sprint chance <font color="+colorTooltip+">[1-20]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("chance to block attacks", "chance to block attacks <font color="+colorTooltip+">[1-10]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("chance to block spells", "chance to block spells <font color="+colorTooltip+">[1-10]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("chance to dodge attacks", "chance to dodge attacks <font color="+colorTooltip+">[1-10]</font>"));
                text = $(this).html();
                $(this).html(text.replaceAll("chance to dodge spells", "chance to dodge spells <font color="+colorTooltip+">[1-10]</font>"));
            });
        }
    }
}

// RUNE
function expandRuneTooltip(obj) {
    var name = obj.spell.name.toLowerCase();
    var txt;
    if(Array.isArray(window.spells[name].statType) == true){
        txt = window.spells[name].statType.map(x => "<font color='orange'>"+x+"</font>");
    } else{
        txt = "<font color='orange'>"+window.spells[name].statType+"</font>";
    }
    var newText = "";
    if (window.spells[name].statType == "none") {
        newText = "Benefits from no stat<br>";
    } else {
        newText = "Benefits from stats: ["+txt+"]<br>";
    }
    Object.keys(obj.spell.values).forEach(function(key) {
        var minmax;
        if(key in window.spells[name].random){
            minmax = window.spells[name].random[key];
        } else{
            minmax = window.spells[name].random["i_"+key];
        }
        var maxrange = minmax[1]-minmax[0];
        var currange = obj.spell.values[key]-minmax[0];
        var startcolor = {r:255,g:0,b:0};
        var endcolor = {r:0,g:255,b:0};
        var r = startcolor.r + (endcolor.r-startcolor.r)*currange/maxrange;
        var g = startcolor.g + (endcolor.g-startcolor.g)*currange/maxrange;
        var b = startcolor.b + (endcolor.b-startcolor.b)*currange/maxrange;
        var mycolor = "rgb("+r+","+g+","+b+")";
        newText += key + ": <font style='color:"+mycolor+";'>" + obj.spell.values[key] + "</font>  [<font style='color:rgb("+startcolor.r+","+startcolor.g+","+startcolor.b+");'>"+minmax[0] +"</font>-<font style='color:rgb("+endcolor.r+","+endcolor.g+","+endcolor.b+");'>"+minmax[1]+"</font>]<br>";
    });
    if (window.spells[name].spellType != "none") {
        if(Array.isArray(window.spells[name].spellType) == true){
            txt = window.spells[name].spellType.map(x => x);
        } else{
            txt = window.spells[name].spellType;
        }
        newText += "<font style='color:#bfc3c7'><br>Rune type : "+txt+"</font>";
    }
    $(".uiTooltipItem .tooltip .damage").eq(0).html(newText);
}

// ROD
function expandFishingRodTooltip(obj) {
    if(window.StatsRangeSTATUS == "true") {
        $('.uiTooltipItem .tooltip .name').each(function() {
            text = $(this).html();
            $(this).html(text.replace(text, text + "+"+numberOfStat));
        });
        $('.uiTooltipItem .tooltip .stats').each(function() {
            text = $(this).html();
            $(this).html(text.replaceAll("extra catch chance", "extra catch chance <font color="+colorTooltip+">[0-60]</font>"));
            text = $(this).html();
            $(this).html(text.replaceAll("faster catch speed", "faster catch speed <font color="+colorTooltip+">[0-150]</font>"));
            text = $(this).html();
            $(this).html(text.replaceAll("higher fish rarity", "higher fish rarity <font color="+colorTooltip+">[0-100]</font>"));
            text = $(this).html();
            $(this).html(text.replaceAll("increased fish weight", "increased fish weight <font color="+colorTooltip+">[0-75]</font>"));
            text = $(this).html();
            $(this).html(text.replaceAll("extra chance to hook items", "extra chance to hook items <font color="+colorTooltip+">[0-30]</font>"));
        });
    }
}

// CARD
function expandRewardCardTooltip(obj) {
    $('.uiTooltipItem .tooltip .name').each(function() {
        var setToTrade = (~~(obj.quantity/obj.setSize));
        var text = $(this).html();
        if (setToTrade == 0) {$(this).html(text.replace(text, text+"<font color='red'>"+setToTrade+" set to trade</font>"));}
        else {$(this).html(text.replace(text, text+"<font color='#ff6942'>"+setToTrade+" set to trade</font>"));}
    })
}
