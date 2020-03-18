var idToName = {};
var inCombatWith = {};

addons.register({
    init: function(events) {
        events.on('onGetObject', this.onGetObject.bind(this));
        events.on('onGetDamage',this.onGetDamage.bind(this));
    },

    onGetObject: function(obj) {
        if(obj.name !== undefined){
            idToName[obj.id]=obj.name;
        }
        if (window.CombatLogSTATUS === "true") {
            if(obj.destroyed !== undefined && obj.destroyed == true){
                if(obj.id in inCombatWith){
                    setTimeout(function(){addCombatMessage(idToName[obj.id] + " has been killed", "redA")}, 100);
                    delete inCombatWith[obj.id];
                }
            }
        }
    },

    onGetDamage: function(dmg) {
        if (window.CombatLogSTATUS === "true") {
            if(dmg.crit !== undefined){
                if(dmg.id !== undefined && dmg.source !== undefined){
                    var enemyName;
                    var action="hit";
                    if(dmg.heal !== undefined && dmg.heal == true){
                        action="heal";
                    }
                    if(window.player !== undefined && dmg.source == window.player.id){
                        inCombatWith[dmg.id] = true;
                        enemyName = idToName[dmg.id];
                        addCombatMessage("You "+(dmg.crit == true ? "critically ":"")+action+" "+enemyName+" for "+ (~~dmg.amount) +" damage", "blueA");
                    } else if(window.player !== undefined && dmg.id == window.player.id){
                        enemyName = idToName[dmg.source];
                        inCombatWith[dmg.source] = true;
                        addCombatMessage(enemyName+(dmg.crit == true ? " critically":"")+" "+action+"s you for "+ (~~dmg.amount) +" damage", "tealC");
                    }
                }
            } else{
                if(dmg.event !== undefined){
                    if(window.player !== undefined && dmg.id == window.player.id && dmg.text.indexOf(" xp") != -1){
                        setTimeout(function(){addCombatMessage("You gained "+dmg.text, "redA")}, 200);
                    }
                }
            }
        }
    }
});

function addCombatMessage(txt, colortxt){
    var msg = "*"+txt+"*";
    jQuery('<div class="list-message color-'+colortxt+' rep">' + msg + '</div>').appendTo(jQuery(".uiMessages .list"));
    jQuery(".uiMessages .list").scrollTop(9999999);
}