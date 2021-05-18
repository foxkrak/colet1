const timer = ms => new Promise(res => setTimeout(res, ms))
 var hh = 0;
 var mm = 0;
 var ss = 0;
 var loop = true;
 var total = 0
 var m = 0;
 var s = 0;
 var ir = 0;
while(loop == true){
    var format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    var format2 = (new Intl.NumberFormat('dec', { style: 'decimal' }).format(total));
    $('#content_value').find('h2').text('[Auto Coleta] Tempo:' + ' ' + format + '⁣⁣        ⁣⁣' + 'Total de Recurso Coletado: ' + format2)
    ss++;
    if (ss == 60){
        ss = 0;
        mm++;
        if(mm == 60){
            mm = 0;
            hh++;
        }
    }
    var recaptcha = document.getElementsByClassName('recaptcha-checkbox-checkmark');
    if (recaptcha.length != 0){
        document.documentElement.getElementsByClassName('recaptcha-checkbox-checkmark')[0].click();
        await timer(1000);
    }
    await timer(1000);
    var listabtn = document.getElementsByClassName('free_send_button');
    var relogio = document.getElementsByClassName('return-countdown');
    if (relogio.length == 0) {
        javascript: (window.TwCheese && TwCheese.tryUseTool('ASS')) || $.ajax('https://cheesasaurus.github.io/twcheese/launch/ASS.js?' +~~((new Date())/3e5),{cache:1,dataType:"script"});void 0;
        await timer(1000);
        for(var k = 3; k > -1; k--) {
            await timer(500);
            m = m + parseInt(document.getElementsByClassName('wood-value')[k].innerText,10);
            s = s + parseInt(document.getElementsByClassName('stone-value')[k].innerText,10);
            ir = ir + parseInt(document.getElementsByClassName('iron-value')[k].innerText,10);
            total = m + s + ir
            $(listabtn[k]).trigger('click')
        }
    }
}