(function(){var link="/misc/mlt.php";var tpre="<!>";var tsuf="<!>";var tm=80;var tn=256;var it={badbrowser:"\u0412\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454 \u043C\u043E\u0436\u043B\u0438\u0432\u0456\u0441\u0442\u044C \u043F\u0435\u0440\u0435\u0445\u043E\u043F\u043B\u0435\u043D\u043D\u044F \u0432\u0438\u0434\u0456\u043B\u0435\u043D\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0443 \u0430\u0431\u043E IFRAME. \u041C\u043E\u0436\u043B\u0438\u0432\u043E, \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0441\u0442\u0430\u0440\u0430 \u0432\u0435\u0440\u0441\u0456\u044F, \u0430 \u043C\u043E\u0436\u043B\u0438\u0432\u043E, \u0449\u0435 \u044F\u043A\u0430\u0441\u044C \u043F\u043E\u043C\u0438\u043B\u043A\u0430.",toobig:"\u0412\u0438 \u0432\u0438\u0431\u0440\u0430\u043B\u0438 \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0438\u0439 \u043E\u0431\u0441\u044F\u0433 \u0442\u0435\u043A\u0441\u0442\u0443!",docmsg:"\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442:",intextmsg:"\u041E\u0440\u0444\u043E\u0433\u0440\u0430\u0444\u0456\u0447\u043D\u0430 \u043F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432 \u0442\u0435\u043A\u0441\u0442\u0456:",ifsendmsg:"\u041D\u0430\u0434\u0456\u0441\u043B\u0430\u0442\u0438 \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F \u043F\u0440\u043E \u043F\u043E\u043C\u0438\u043B\u043A\u0443 \u0430\u0432\u0442\u043E\u0440\u0443?\n\u0412\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0437\u0430\u043B\u0438\u0448\u0438\u0442\u044C\u0441\u044F \u043D\u0430 \u0442\u0456\u0439 \u0436\u0435 \u0441\u0442\u043E\u0440\u0456\u043D\u0446\u0456.",send:"\u0412\u0456\u0434\u043F\u0440\u0430\u0432\u0438\u0442\u0438",cancel:"\u0412\u0456\u0434\u043C\u0456\u043D\u0430",entercmnt:"\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440 (\u043D\u0435 \u043E\u0431\u043E\u0432`\u044F\u0437\u043A\u043E\u0432\u043E):"};var w=window;var d=w.document;var de=d.documentElement;var b=d.body;var fr=null;var msgbox={};var temp="";var start=function(){d.onkeypress=checkkeys};var strame=function(url,txt,com){var frame="error_frame_010101";if(!fr){fr=cframe(frame)}var f=d.createElement("FORM");f.style.position="absolute";f.style.top="-10000px";f.action=link;f.method="post";f.target=frame;var t={hs:"381eb1af49aabb5bcbcef09d59e146ba",ref:url,t_pre:txt.pre,t_sel:txt.text,t_suf:txt.suf,t_pos:txt.pos,charset:d.charset||d.characterSet||"",comment:com};for(var k in t){var h=d.createElement("INPUT");h.type="hidden";h.name=k;h.value=t[k];f.appendChild(h)}sstyl(f);f.submit();f.parentNode.removeChild(f)};var poz=function(){var w=0,h=0;if(typeof(w.innerWidth)=="number"){w=w.innerWidth;h=w.innerHeight}else{if(de&&(de.clientWidth||de.clientHeight)){w=de.clientWidth;h=de.clientHeight}else{if(b&&(b.clientWidth||b.clientHeight)){w=b.clientWidth;h=b.clientHeight}}}var x=0,y=0;if(typeof(w.pageYOffset)=="number"){y=w.pageYOffset;x=w.pageXOffset}else{if(b&&(b.scrollLeft||b.scrollTop)){y=b.scrollTop;x=b.scrollLeft}else{if(de&&(de.scrollLeft||de.scrollTop)){y=de.scrollTop;x=de.scrollLeft}}}return{w:w,h:h,x:x,y:y}};msgbox.confirm=function(m,bx,cn){var ts=new Date().getTime();var tm=confirm(it.docmsg+"\n   "+d.location.href+"\n"+it.intextmsg+"\n   \""+m+"\"\n\n"+it.ifsendmsg);var dt=new Date().getTime()-ts;if(tm){bx("")}else{if(!cn&&dt<50){var sv=d.onkeyup;d.onkeyup=function(e){if(!e){e=window.event}if(e.keyCode==17){d.onkeyup=sv;msgbox.confirm(m,bx,true)}}}}};msgbox.css=function(txt,pl){var div=d.createElement("DIV");var w=550;if(w>b.clientWidth-10){w=b.clientWidth-10}div.style.zIndex="10001";div.innerHTML=""+"<div style=\"background:#EDEDED; width:"+w+"px; z-index:10001; padding:1em; font: normal 14px Arial, Helvetica, sans-serif; color:black\">"+"<div style=\"font-weight:bold; padding-bottom:0.2em\">"+it.intextmsg+"</div>"+"<div style=\"padding: 0 0 1em 1em\">"+txt.replace(tpre,"<u style=\"color:#990002\">").replace(tsuf,"</u>")+"</div>"+"<div style=\"padding: 0 0 1em 0;\">"+it.ifsendmsg.replace(/\n/,"<br/>")+"</div>"+"<form style=\"padding:0; margin:0; border:0\">"+"<div>"+it.entercmnt+"</div>"+"<input type=\"text\" maxlength=\"250\" style=\"width:100%; margin: 0.2em 0; border:1px solid #3b3b3b;\" />"+"<div style=\"text-align:right; font-family: Tahoma\">"+"<input type=\"submit\" value=\""+it.send+"\" style=\"width:8em; font-weight: bold;\">&nbsp;"+"<input type=\"button\" value=\""+it.cancel+"\" style=\"width:8em\">"+"</div>"+"</form>"+"</div>"+"";sstyl(div);var inp=div.getElementsByTagName("input");var fra=div.getElementsByTagName("form");var t=inp[0];var kdd=null;var fn=[];var fl=function(){d.onkeydown=kdd;kdd=null;div.parentNode.removeChild(div);for(var i=0;i<fn.length;i++){fn[i][0].style.visibility=fn[i][1]}temp=t.value};var pos=function(p){var s={x:0,y:0};while(p.offsetParent){s.x+=p.offsetLeft;s.y+=p.offsetTop;p=p.offsetParent}return s};setTimeout(function(){var w=div.clientWidth;var h=div.clientHeight;var dim=poz();var x=(dim.w-w)/2+dim.x;if(x<10){x=10}var y=(dim.h-h)/2+dim.y-10;if(y<10){y=10}div.style.left=x+"px";div.style.top=y+"px";if(navigator.userAgent.match(/MSIE (\d+)/)&&RegExp.$1<7){var sl=d.getElementsByTagName("SELECT");for(var i=0;i<_49.length;i++){var s=sl[i];var p=pos(s);if(p.x>x+w||p.y>y+h||p.x+s.offsetWidth<x||p.y+s.offsetHeight<y){continue}fn[fn.length]=[s,s.style.visibility];s.style.visibility="hidden"}}t.value=temp;t.focus();t.select();kdd=d.onkeydown;d.onkeydown=function(e){if(!e){e=window.event}if(e.keyCode==27){fl()}};fra[0].onsubmit=function(){pl(t.value);fl();temp="";return false};inp[2].onclick=function(){fl()}},10)};var getsel=function(){try{var t1=null;var t2=null;if(w.getSelection){t2=w.getSelection()}else{if(d.getSelection){t2=d.getSelection()}else{t2=d.selection}}var _53=null;if(t2!=null){var pre="",t1=null,suf="",pos=-1;if(t2.getRangeAt){var r=t2.getRangeAt(0);t1=r.toString();var t3=d.createRange();t3.setStartBefore(r.startContainer.ownerDocument.body);t3.setEnd(r.startContainer,r.startOffset);pre=t3.toString();var t4=r.cloneRange();t4.setStart(r.endContainer,r.endOffset);t4.setEndAfter(r.endContainer.ownerDocument.body);suf=t4.toString()}else{if(t2.createRange){var r=t2.createRange();t1=r.text;var t3=t2.createRange();t3.moveStart("character",-tm);t3.moveEnd("character",-t1.ngth);pre=t3.text;var t4=t2.createRange();t4.moveEnd("character",tm);t4.moveStart("character",n.length);suf=t4.text}else{t1=""+t2}}var p;var s=(p=t1.match(/^(\s*)/))&&p[0].length;var e=(p=t1.match(/(\s*)$/))&&p[0].length;pre=pre+t1.substring(0,s);suf=t1.substring(t1.length-e,t1.length)+suf;t1=t1.substring(s,t1.length-e);if(t1==""){return null}return{pre:pre,text:t1,suf:suf,pos:pos}}else{alert(it.badbrowser);return}}catch(e){return null}};var tex=function(){if(navigator.appName.indexOf("Netscape")!=-1&&eval(navigator.appVersion.substring(0,1))<5){alert(it.badbrowser);return}var st=getsel();if(!st){return}with(st){pre=pre.substring(pre.length-tm,pre.length).replace(/^\S{1,10}\s+/,"");suf=suf.substring(0,tm).replace(/\s+\S{1,10}$/,"")};var t=(st.pre+"<!>"+st.text+"<!>"+st.suf);if(t.length>tn){alert(it.toobig);return}msgbox["css"](t,function(tmp){strame(d.location.href,st,tmp)})};var checkkeys=function(e){var cd=0;var we=w.event;if(we){cd=we.keyCode==10||(we.keyCode==13&&we.ctrlKey)}else{if(e){cd=(e.which==10&&e.modifiers==2)||(e.keyCode==0&&e.charCode==106&&e.ctrlKey)||(e.keyCode==13&&e.ctrlKey)}}if(cd){tex();return false}};var sstyl=function(e){e.style.position="absolute";e.style.top="-10000px";if(b.lastChild){b.insertBefore(e,b.lastChild)}else{b.appendChild(e)}};var cframe=function(tmp){var div=d.createElement("DIV");div.innerHTML="<iframe name=\""+tmp+"\"></iframe>";sstyl(div);return d.childNodes[0]};start()})();