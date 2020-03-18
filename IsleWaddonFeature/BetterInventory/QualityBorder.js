window.lowLevel = "false";
window.lowStat = "false";
window.equipSide = "";

addons.register({
	init: function(events) {
	events.on('onGetStats', this.onGetStats.bind(this));
	},
	onGetStats:function(obj){
		window.stat = obj;
	}
});

window.rotateItems = function(listOfItems){
	var statValue = window.stat;
	for(var i in listOfItems){
		window.lowStat = "false";
		window.lowLevel = "false";
		window.equipSide = "";
		var itemData = listOfItems.eq(i);
		if(itemData.data('item')!==undefined){
			window.itemDataQality = itemData.data('item').quality;
			window.qualityColor(window.itemDataQality);
			if(itemData.data('item').requires !==undefined && listOfItems == this.items){
				window.statReq = itemData.data('item').requires["0"]["stat"];
				window.valueReq = itemData.data('item').requires["0"]["value"];
				if(window.valueReq > statValue[window.statReq]){
					window.lowStat="true";
				}
			}
			if(itemData.data('item').LeveL !==undefined && listOfItems == this.items){
				window.levelReq = itemData.data('item').LeveL;
				if(window.levelReq > statValue["level"]){
					window.lowLevel="true";
				}
			}

			if(listOfItems == this.leftSide){window.equipSide = "left"}
			if(listOfItems == this.rightSide){window.equipSide = "right"}

			window.addBorder(listOfItems[i]);
			continue;
		}

		if(listOfItems[i].className == "slot empty show-default-icon"){
			listOfItems[i].setAttribute("style"," ");
		}
	}
}

window.qualityColor = function (itemDataQality){
	if(window.itemDataQality == 0  || window.itemDataQality == undefined){window.colorQ = "#fcfcfc";}
	else if(window.itemDataQality == 1 ){window.colorQ = "#4ac441";}
	else if(window.itemDataQality == 2 ){window.colorQ = "#3fa7dd";}
	else if(window.itemDataQality == 3 ){window.colorQ = "#a24eff";}
	else if(window.itemDataQality == 4 ){window.colorQ = "#ff6942";}
}

window.qualityBorder = function(){
	if(window.gameStarted == "true"){
		// Inventory
		if(jQuery(".ui-container .uiInventory").css("display") == "block" ){
		    this.items = $('.uiInventory .grid .item');
		    window.rotateItems(this.items);
		}
		// Stash
		if(jQuery(".ui-container .uiStash").css("display") == "block" ){
		    this.Stash = $('.uiStash .grid .item');
		    window.rotateItems(this.Stash);
		}
		// Mail
		if(jQuery(".ui-container .uiMail").css("display") == "block" ){
		    this.Mail = $('.uiMail .bottom .col .item');
		    window.rotateItems(this.Mail);
		}
		// Equipment
		if(jQuery(".ui-container .uiEquipment").css("display") == "block" ){
		    this.leftSide = $('.uiEquipment .content .left .slot');
		    this.rightSide = $('.uiEquipment .content .right .slot');
		    this.runes = $('.uiEquipment .content .runes .slot');
		    window.rotateItems(this.leftSide);
		    window.rotateItems(this.rightSide);
		    window.rotateItems(this.runes);
		}
	}
};setInterval(window.qualityBorder, 10);

window.addBorder = function(item){
	if(window.lowLevel == "false" && window.lowStat == "false"){
		item.style.border = window.borderWidthQ[window.borderSetting];
		item.style.borderColor = window.colorQ;
		item.style.borderRadius = window.borderRadiusQ[window.borderSetting];

		if(window.equipSide == "left"){
			if(window.borderEQ == 1) {
				item.style.borderLeftStyle = window.borderStyleQ;
			} else {
				item.style.borderStyle = window.borderStyleQ;
			}
			item.style.borderLeftWidth = window.borderBottomWidthQ[window.borderSetting];
		}
		else if(window.equipSide == "right"){
			if(window.borderEQ == 1) {
				item.style.borderRightStyle = window.borderStyleQ;
			} else {
				item.style.borderStyle = window.borderStyleQ;
			}
			item.style.borderRightWidth = window.borderBottomWidthQ[window.borderSetting];
		}
		else {
			item.style.borderStyle = window.borderStyleQ;
			item.style.borderBottomWidth = window.borderBottomWidthQ[window.borderSetting];
		}

	} else if(window.lowLevel == "true" || window.lowStat == "true"){
		item.style.border = window.borderWidthQ[window.borderSetting];
		item.style.borderBottomWidth = window.borderBottomWidthQ[window.borderSetting];
		item.style.borderStyle = window.borderStyleQ;
		item.style.borderRadius = window.borderRadiusQ[window.borderSetting];
		item.style.borderColor = window.colorQ;
		item.style.background = window.backColor[window.borderSetting];
	}
}
