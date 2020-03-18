// ==UserScript== 
// @name         Hide quest for IWD 0.3.2 
// @version      3
// @description  Hide quest list by pressing 1 key
// @author       Chronus / Polfy's
// @match        https://play.isleward.com/
// ==/UserScript==

var QuestKey = "g";

addons.register({
    hideUIQuests: false,
    init: function(events) {
        this.hideUIQuests = window.localStorage.getItem('iwd_opt_hideUIQuests');

        events.on('onKeyDown', this.onKeyDown.bind(this));
        events.on('onRezone', this.onRezone.bind(this));
        events.on('onObtainQuest', this.onObtainQuest.bind(this));
    },
    onKeyDown: function(key) {
        if (!key) {
            return;
        } else if (key == QuestKey) {
            this.hideUIQuests = this.hideUIQuests === 'false' ? 'true' : 'false';
            window.localStorage.setItem('iwd_opt_hideUIQuests', this.hideUIQuests);
            this.onUpdateUIQuests();
        }
    },
    onUpdateUIQuests: function() {
        this.hideUIQuests = window.localStorage.getItem('iwd_opt_hideUIQuests');
        var questEl = $(".ui-container .right .uiQuests .heading");
        var questListEl = $(".ui-container .right .uiQuests .list");

        if (this.hideUIQuests == 'true') {
            questEl.text("Quests HIDE");
            questListEl.toggle(false);
        } else if (this.hideUIQuests == 'false' && questEl.text() != 'Quests') {
            questEl.text("Quests");
            questListEl.toggle(true);
        }
    },
    onRezone: function() {
        this.onUpdateUIQuests();
    },
    onObtainQuest: function() {
        this.onUpdateUIQuests();
    }
});
