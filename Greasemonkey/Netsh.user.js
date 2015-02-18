// ==UserScript==
// @name        Netsh
// @description Netsh助手 for Firefox Only
// @namespace   onisuly
// @include     http://serve.netsh.org/pub/ipv4-hosts/
// @version     2015.02.18
// @grant       none
// @run-at      document-start
// @require     https://raw.githubusercontent.com/dankogai/js-base64/master/base64.min.js
// ==/UserScript==

/*
添加下列规则到广告过滤中：
http://serve.netsh.org/pub/hosts_src/omni.dialog.min.*.js*
http://serve.netsh.org/pub/ipv4-hosts/hosts_src/script.*.js*
*/

(function (w) {  
    // Remove the current jQuery ready code
    function pre_script_execute_handler (e) {       
        var target = e.target;
        if (target.innerHTML.indexOf("$( document ).ready(") != -1) {
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

            //表单
            for (var i = document.forms[0].elements.length - 1; i >= 0; i--) {
                document.forms[0].elements[i].disabled = false;
                document.forms[0].elements[i].checked = true;
            };

            //说明
            function unicode2Ascii(str){
                var n = 0;
                var r = '';
                var m = 0;
                //65535
                for(var i=0;i<str.length;i++){
                    if(str.charAt(i)==='&'&& i < str.length-1  &&str.charAt(i+1)==='#'){
                        n=0;
                        for(var j=0;j<6;j++) {
                            m = i+2 + j;
                            if(m >= str.length){
                                break;
                            }
                            if(str.charAt(m)===';'){
                                n = j;
                                break;
                            }
                        }
                        if(n===0){
                            r += str.charAt(i);
                        }else{
                            r += String.fromCharCode(parseInt(str.substr(i+2,n)));
                            i+=n+2;
                        }
                    }else{
                        r += str.charAt(i);
                    }
                }
               
                return r;
            }
            $(".wttxt")[0].value = unicode2Ascii( Base64.decode( $(".wttxt")[0].value ) );

            //广告检测
            $("form#hform").submit(function(){
                var form = $(this);
                var button = $("#hbtn");
                var text = button.attr('value');
                button.attr('disabled',true);
                button.attr('value', '生成中，请稍等最多30秒..');
                var textarea = $("#hosts-content");
                $.ajax({
                    url: form.attr('action'),
                    type: 'get',
                    data:{
                        passcode: pass,
                        gs: $("#gs").is(':checked')?"on":"off",
                        wk: $("#wk").is(':checked')?"on":"off",
                        twttr: $("#twttr").is(':checked')?"on":"off",
                        fb: $("#fb").is(':checked')?"on":"off",
                        flkr: $("#flkr").is(':checked')?"on":"off",
                        dpbx: $("#dpbx").is(':checked')?"on":"off",
                        odrv: $("#odrv").is(':checked')?"on":"off",
                        yt: $("#yt").is(':checked')?"on":"off",
                        validate: validate,
                        nolh: $("#nolh").is(':checked')?"on":"off"
                    },
                    timeout: 30000,
                    error: function(){
                        button.attr('value', '出现问题，请刷新重试一次');
                        window.location.href = form.attr('action')+"?dpbx=on&gs=on&wk=on&twttr=on&fb=on&flkr=on&odrv=on&yt=on&aapl=on&preview=yes&passcode="+pass+"&validate="+validate;
                    },
                    success: function(txt){
                        //$("form#hosts-output-form textarea").css({color: "#FFF"});
                        textarea.text(txt);
                        button.attr('disabled', null);
                        button.attr('value', '立刻获取');
                        hsir.scrollTo($('#hosts-output').prev(), 600);
                        //$(document.body).find(".hosts-mask").fadeIn(2500);
                    }
                });

                return false;
            });

            $('#select-all').click(function() {
                $("#hosts-content").select();
                try {
                    ga('send', 'event', 'button', 'click', 'IPv4-selectAllHostsContent');
                } catch (e) {}
            });
            

            //Twitter
            $("#hform").append("<input id='btnTwitter' type='button' class='wtbtn' style='margin-left:10px' value='Twitter Hosts' onclick=''>")
            $("#btnTwitter").click(function() {
                //var a = $('a')[0];  
                var a = $("<a href='http://serve.netsh.org/pub/ipv4-hosts/pagead2.googlesyndication.com/NYSE_TWTR.php?passcode=" + pass + "&validate=" + validate + "' target='_blank'></a>").get(0);  
                  
                var e = document.createEvent('MouseEvents');
      
                e.initEvent('click', true, true);  
                a.dispatchEvent(e);  
                console.log('event has been changed');  
            });
            $("#hosts-select").append("<iframe src='http://serve.netsh.org/pub/ipv4-hosts/pagead2.googlesyndication.com/NYSE_TWTR.php?passcode=" + pass + "&validate=" + validate + "' height='312px' width='914px'></iframe");
        });
    }
}) (unsafeWindow);
