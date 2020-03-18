window.SalvageKey = "f";
var itemPos = -1;

addons.register({
    init: function(events) {
        events.on('onShowItemTooltip', this.onShowItemTooltip.bind(this));
        events.on('onHideItemTooltip', this.onHideItemTooltip.bind(this));
        events.on('onKeyDown', this.onKeyDown.bind(this));
    },

    onShowItemTooltip: function(obj) {
        if(obj.material == true || obj.noSalvage == true){
            itemPos = -1;
        } else{
            itemPos = obj.pos;
			itemToolTipdata = obj
        }

    },

    onHideItemTooltip: function() {
        itemPos = -1;
    },

    onKeyDown: function(key) {
        if (!key) {
            return;
        } else if (window.SalvageSTATUS == "true" && key == window.SalvageKey) {
            if(jQuery(".ui-container .uiInventory").css("display") == "block" && itemPos != -1 && typeof jQuery(".uiMessages .active .typing")[0] === "undefined"){
				j = checkIfSaved(itemToolTipdata);
				if (j < Object.keys(lockUsersItemsIDs[currentUserName]).length) { return; }
                jQuery(".ui-container .uiInventory .grid .item").eq(itemPos).find(".icon").contextmenu();
                for(var i=0;i< $(".uiContext .list .option").length;++i){
                    if(jQuery(".uiContext .list .option").eq(i).text() == "salvage"){
                        jQuery(".uiContext .list .option").eq(i).click();
                        break;
                    }
                }
            }
        }
    }
})
