// ==UserScript==
// @name         Set to trade for IWD 0.3.2 
// @version      1
// @description  Add how much set of card you can trade
// @author       Polfy's
// @match        https://play.isleward.com/
// ==/UserScript== 

var objRewardCard;

addons.register({
    init: function(events) {
        events.on('onShowItemTooltip', this.onShowItemTooltip.bind(this));
        events.on('onBuiltItemTooltip', this.onBuiltItemTooltip.bind(this));
    },
    onShowItemTooltip: function(obj) {
        objRewardCard = obj;
    },
    onBuiltItemTooltip: function(obj) {
        expandRewardCardTooltip(objRewardCard);
    },
});
function expandRewardCardTooltip(obj){
    if(obj.type === "Reward Card"){
        $('.uiTooltipItem .tooltip .name').each(function() {
            var setToTrade = (~~(obj.quantity/obj.setSize));
            var text = $(this).html();
            if (setToTrade == 0) {$(this).html(text.replace(text, text+"<font color='red'>"+setToTrade+" set to trade</font>"));}
            else {$(this).html(text.replace(text, text+"<font color='#ff6942'>"+setToTrade+" set to trade</font>"));}
        })
    }
};
