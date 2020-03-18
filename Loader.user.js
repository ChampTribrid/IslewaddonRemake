// ==UserScript==
// @name         IsleWaddon
// @namespace    Isleward.Waddon
// @version      5.1
// @description  Read README here : https://github.com/Polfy/IsleWaddon
// @author       Polfy's
// @match        play.isleward.com*
// @match        ptr.isleward.com*
// @grant        none
// ==/UserScript==

console.log('********WARNING********');
console.log('*IF YOU LOG IWD ISSUES*');
console.log('***IsleWaddon LOADED***');

window.getScript = function(source, callback) {
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onload = script.onreadystatechange = function( _, isAbort ) {
        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
            script.onload = script.onreadystatechange = null;
            script = undefined;

            if(!isAbort && callback) setTimeout(callback, 0);
        }
    };

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
}

window.getScript("https://Polfy.github.io/IsleWaddon/IsleWaddon.js")
