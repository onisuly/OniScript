// ==UserScript==
// @name        Steam Discovery Queue
// @description Auto go through Steam Discovery Queue
// @namespace   oni
// @include     http://store.steampowered.com/app/*
// @include     http://store.steampowered.com/agecheck/*
// @version     2016.06.26
// @grant       none
// ==/UserScript==

if ( !window.CDiscoveryQueue ) return;

if ( location.href.match(/http[s]?:\/\/store.steampowered.com\/agecheck\/app\/.+/) ) {
    document.getElementsByName("ageYear")[0].value="1900";
    DoAgeGateSubmit();
}
else if ( location.href.match(/http[s]?:\/\/store.steampowered.com\/app\/[0-9]+\/agecheck.?/) ) {
    HideAgeGate();
}
else {
    $J('#next_in_queue_form').submit();
}