// ==UserScript==
// @name         AutoFillLoginInfo for IWD 0.3.2
// @version      1
// @description  Auto fill your log informations
// @author       Polfy's
// @match        https://play.isleward.com/
// ==/UserScript==

// Put your personal Log Info between the "" //
var username = ""
var password = ""

addons.register({
	init: function(events) {
		events.on('onResourcesLoaded', this.onResourcesLoaded.bind(this));
	},
	onResourcesLoaded: function() {
		checkUiLoaded(".btnLogin");
	},
});

function checkUiLoaded(ui_name) {
    if ($(ui_name)[0]){
        $(".txtUsername").val(username);
        $(".txtPassword").val(password);
    } else {
        setTimeout(function() { checkUiLoaded(ui_name) }, 50);
    }
}
