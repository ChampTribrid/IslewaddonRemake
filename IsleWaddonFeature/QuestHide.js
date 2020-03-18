addons.register({
    init: function(events) {
        events.on('onRezone', this.onRezone.bind(this));
        events.on('onObtainQuest', this.onObtainQuest.bind(this));
    },

    onRezone: function () {
        window.onUpdateUIQuests();
    },

    onObtainQuest: function () {
        window.onUpdateUIQuests();
    }
})

window.onUpdateUIQuests = function(){
    if (window.QuestHideSTATUS == "true") {
        $(".ui-container .right .uiQuests .heading").text("Quests hidden ❌ ");
        $(".ui-container .right .uiQuests .list").toggle(false);
    } else if (window.QuestHideSTATUS == "false" && $(".ui-container .right .uiQuests .heading").text() != 'Quests') {
            $(".ui-container .right .uiQuests .heading").text("Quests");
            $(".ui-container .right .uiQuests .list").toggle(true);
    }
}