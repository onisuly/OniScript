// ==UserScript==
// @name        Netsh
// @description 禁止Netsh检测ADBlock
// @namespace   onisuly
// @include     http://serve.netsh.org/pub/gethosts.php
// @include     http://serve.netsh.org/pub/ipv6-hosts/
// @version     2015.02.04
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function (w) {
    // Remove the current jQuery ready code
    function pre_script_execute_handler (e) {
        var target = e.target;
        if (target.innerHTML.indexOf("$(document).ready(") != -1) {
            console.log('Removed ready');
            e.preventDefault();
            e.stopPropagation();
            addReady();
        }
    }
    w.addEventListener('beforescriptexecute', pre_script_execute_handler);

    // Add new jQuery ready code
    function addReady () {
        console.log('Adding new ready');
        w.$(document).ready(function () {
            console.log('Our ready called');
        });
    }
}) (unsafeWindow);
