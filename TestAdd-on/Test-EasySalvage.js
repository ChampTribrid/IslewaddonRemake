// ==UserScript==
// @name         FastSalvage for IWD 0.3.2 
// @version      1
// @description  Salvage an item with 1 keypress
// @author       Polfy's
// @match        https://play.isleward.com/
// Thxs to qndel : https://github.com/qndel/IslewardAddonBundle/blob/master/easysalvage.js
// ==/UserScript== 

var salvageKey = "f"
var itemPos = -1

addons.register({
    init: function(events) {
        events.on('onShowItemTooltip', this.onShowItemTooltip.bind(this));
        events.on('onHideItemTooltip', this.onHideItemTooltip.bind(this));
        events.on('onKeyDown', this.onKeyDown.bind(this));
    },
    onShowItemTooltip: function(obj) {
        if(obj.material === true || obj.noSalvage === true){
            itemPos = -1;
        } else{
            itemPos = obj.pos;
        }
    },
    onHideItemTooltip: function(obj) {
        itemPos = -1;
    },
    onKeyDown: function(key) {
        if (!key) {
            return;
        } else if (key == salvageKey) {
            if(jQuery(".ui-container .uiInventory").css("display") == "block" && itemPos != -1 && typeof jQuery(".uiMessages .active .typing")[0] === "undefined"){
                jQuery(".ui-container .uiInventory .grid .item").eq(itemPos).find(".icon").contextmenu();
                for(var i=0;i< $(".uiContext .list .option").length;++i){
                    if(jQuery(".uiContext .list .option").eq(i).text() == "salvage"){
                        jQuery(".uiContext .list .option").eq(i).click();
                        break;
                    }
                }
            }
        }
    },
});
