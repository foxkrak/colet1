function getMsColor(x){
    var y="";
    if (x<200) {y="black";}
    else if (x<400) { y="blue";}
    else if (x<600) { y="darkgreen";}
    else if (x<800) { y="darkmagenta";}
    else { y="red";}
    return y;
}

function ShowTime() {
    var r = Timing.getCurrentServerTime()/ 1e3;
    var x=Format.date(r, !0, 1, 1);
    var y=x.replace(/(<([^>]+)>)/ig,"").split(' ');
    var g=y[y.length-1];
    var j=g.split(':');
    var time=[];
    var ms=j[j.length-1];
    var server_lag=Number(Timing.offset_to_server);
    for(var i=0;i<3;i++){
        time.push(j[i]);
    }
    var timing=time.join(':');
    var k="<span id='time_display'>"+timing+"</span>|<font color=darkorange><b> Ms:<span id='lag_display' class='ms_info'>"+ms+"</span><span id='tsal_tw_lag'>|<font color=red><b> Lag: "+server_lag+" ms</b></font></span>";
    $('#serverTime').hide();
    if($("#lag_display").length==0) { $('#serverTime').before(k); $(".server_info").css("font-size", "medium"); }
    else { $("#lag_display").html(ms); $("#time_display").html(timing); }
    $(".ms_info").css("color", getMsColor(ms));
}

function setMS()
{ var element1=document.getElementById("serverTime");
 var element2=document.getElementById("tsal_tw_ms");
 var time=element1.innerHTML.match(/^\d+\:\d+\:\d+/);
 var date=new Date();
 var ms=(date.getMilliseconds()).toString();
 while(ms.length<3){ms="0"+ms;};
 var x=Number(ms); if (x<200) { $("#tsal_tw_ms").css("color", "black");}
 else if (x<400) { $("#tsal_tw_ms").css("color", "blue");}
 else if (x<600) { $("#tsal_tw_ms").css("color", "darkgreen");}
 else if (x<800) { $("#tsal_tw_ms").css("color", "darkmagenta");}
 else { $("#tsal_tw_ms").css("color", "red");}
 element2.innerHTML=ms;}
if (!document.getElementById('time_display')) {
    /*
	 var server_ms='';
  var server_lag=Number(Timing.offset_to_server)-70;
$('.server_info').append('<span class="server_info">|<font color=darkorange><b> Ms: <span  id="tsal_tw_ms">'+server_ms+'</b></font></span><span id="tsal_tw_lag" class="server_info">|<font color=red><b> Lag: '+server_lag+' ms</b></font></span>');
 $(".server_info").css("color", "blue"); $(".server_info").css("font-size", "medium");
 */
    var tnt_show_ms = window.setInterval(ShowTime,1);
}
