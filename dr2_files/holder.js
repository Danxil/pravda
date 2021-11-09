(function (w, undefined){
if(typeof w.holder!='undefined')return false;
if(typeof H_DEV=='undefined')H_DEV=0;
w.holderPlaces=w.holderPlaces||[];
function hO(divID, options){
	var div=null,place=this;
	if (this instanceof hO){
		if (typeof divID=="string"){
			div=document.getElementById(divID);
			if(!div && !hO.isDomReady){
				hO.list.add(function(){new hO(divID, options);});return;
			}
		} else {
			div=divID;
			divID=div.id;
		}
		if (hO.places[divID])
			return hO.places[divID];
		if (options.test)
			H_DEV=1;
		place.div=div;
		place.options={};
		place.loaded=0;
		options.d=divID;
		var ho=hO.options;
		if(options.keyword)
			ho.keyword=escape(options.keyword);
		if(ho.tester)
			options.keyword = (options.keyword?options.keyword+',':'')+ho.tester;
		hO.merge(place.options, hO.options, options);
		hO.places[divID]=place;
		if (!options.nocall) {
			if(typeof options.nowait=='undefined')
				hO.list.add(function(){place.load()});
			else
				place.load();
		}
		return place;
	} else {
		return hO.places[divID];
	}
}

hO.prototype={
	load: function(){
		if (!this.div)
			return false;
		var place=this,str='',vars={b:'block',s:'segment',p:'postview',c:'cookie',r:'rnd',d:'d',u:'user',f:'f',h:'h',w:'keyword'},row=place.options;
		if(place.loaded){
			row.rnd=Math.round(Math.random()*1000000000);
			this.div.innerHTML='';
		}
		if(row.postview)
			row.rnd='0.'+row.rnd;
		if(typeof row.blockSet[row.block]!='undefined')
			str+='&'+row.blockSet[row.block]
		for(i in vars)if(row[vars[i]])str+='&'+i+row[vars[i]];
		hO.loadScript(/*H_DEV?row.d+'_response.js?'+hO.options.rnd:*/hO.host+'s?ta'+str,function(){place.done();},row.delay);
		place.loaded=1;
	},
	done: function(){
		this.loaded=2;
	},
	countView: function() {
		if (typeof this.options.bn_url!='undefined') {
			bn_url = this.options.bn_url;
			var pos = bn_url.indexOf('?');
			var match = bn_url.slice(pos+1).split('&'),parm={z:'b',d:'u',k:'r',b:''},value;
			var countURL = hO.host+'s?tv&p1';
			this.view = {};
			for(i=0;i<match.length;i++){
				var letter = match[i].slice(0,1);
				value = parseInt(match[i].slice(1)) + 0;
				if(parm[letter])
					countURL+='&'+parm[letter]+value;
				if (!isNaN(value))
					this.view[letter] = value;
			}
			(new Image()).src=countURL;
		}
	}
}

hO.merge=function() {
	var options, name, copy, target=arguments[0] || {};
	for (i=1;i<arguments.length;i++ )
		if((options=arguments[i])!=null)
			for(name in options)
				if(options.hasOwnProperty(name)&&options[name]!==undefined)
					target[name]=options[name];
	return target;
}
hO.dbg=function(str){
	if(H_DEV)if(w.console)w.console.log('%chO: %O',"background:#cecece; font-size: 10pt",str);
}
hO.ready=function(str) {//dom ready
	hO.dbg('domReady '+str);
	if (hO.isDomReady)
		return false;
	hO.isDomReady=true;
	hO.list.call(true);//execute the places loading
}
hO.onload=function(func) {
	if (document.readyState=='complete')
		return func('c');
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", function(){func('el')}, false);
		w.addEventListener("load", function(){func('elw')}, false);
	} else if (document.attachEvent) {
		document.attachEvent("onreadystatechange",function(){func('ae')},false);
		w.attachEvent("onload", function(){func('aew')});
	}
}

hO.loadScript=function(src, func, delay){
	var scr=document.createElement("SCRIPT"),head=document.getElementsByTagName('HEAD')[0];
	scr.async=true;
	scr.src=src;
	if (!head)
		return;
	if (func) {
		scr.onload=scr.onreadystatechange=function(evt){
			if (!scr.readyState || scr.readyState == 'loaded' || scr.readyState == 'complete') {
				scr.onload=scr.onreadystatechange=null;
				func(scr);
			}
		}
	}
	if (delay)
		setTimeout(function (){head.appendChild(scr);}, delay);
	else
		head.appendChild(scr);
	hO.dbg('loading '+src);
}

hO.funcs=function(ready){this.list=[];this.ready=ready ? true: false}
hO.funcs.prototype={
	add: function(func){this.ready ?
		func() :
		this.list[this.list.length]=func;},
	call: function(ready){
		this.ready=ready ? true : false;
		for (var i=0; i < this.list.length; i++)
			this.list[i]();
		this.list.splice(0,this.list.length);
	}
}
hO.flashVer=function(){
	var n=navigator,f='Shockwave Flash',m,d;
	if ((m=n.mimeTypes)&&(m=m["application/x-shockwave-flash"])&&m.enabledPlugin&&(n=n.plugins)&&n[f]){
		d=n[f].description;
	} else if(w.ActiveXObject){
		try{
			d=(new ActiveXObject((f+'.'+f).replace(/ /g,''))).GetVariable('$version');
		}catch(e){}}
	return d ? d.match(/(\d+)/)[0] : 0;
}

hO.addAgeSex = function(age, sex){
	var s=0;
	if(sex){
		s+=0x1;
		if(sex=='m')
			s+=0x2;
	}
	if(age>=12){
		if(age<=17)
			s+=0x4;
		else if(age<=24)
			s+=0x8;
		else if(age<=30)
			s+=0x10;
		else if(age<=40)
			s+=0x20;
		else if(age<=50)
			s+=0x40;
		else
			s+=0x80;
	}
	hO.options.user=s;
}

hO.module=function(name,state){
	if(this instanceof hO.module){
		if(name && !hO.modules[name]){
			this.name=name;
			this.ready=state||0;
			this.list=new hO.funcs();
			hO.modules[name]=this;
			this.load();
		}
	}
	return hO.modules[name];
}

hO.module.prototype={
	ready: 0,
	onload: function(func){
		if (this.ready==2)
			func();
		else
			this.list.add(func);
	},
	loaded: function(){
		this.ready=2;
		this.list.call(true);
	},
	load: function(){
		if (this.ready==0) {
			hO.loadScript((H_DEV?'//i.banner.mi6/banners/ajax/'+this.name+'.js':(hO.protocol+'i.holder.com.ua/t/')+this.name+'.y'+Math.round(hO.version*100)+hO.day+'.js'));
			this.ready=1;
		}
	}
}
hO.moduleLoad=function(names, func){
	var waitModules=names.length
	for(i=0;i<names.length;++i)
		new holder.module(names[i]).onload(function(){if(!--waitModules)func()})
}

hO.start=function(){
	hO.version=1.08;
	hO.day=(new Date()).getDay();
	hO.places={};
	hO.modules={};
	if (!document.cookie)document.cookie="b=b; path=/";
	hO.options={rnd: Math.round(Math.random()*100000000),nocall:0,cookie:0,blockSet:{}};
	var na=navigator.userAgent,wl=w.location;
	if (document.cookie&&!(na.indexOf('AppleWebKit')!=-1&&na.indexOf('Chrome')==-1))hO.options.cookie=1;
	var page=(self!=top)?document.referrer:wl.href,matches;
	if (matches=page.match(/[?&]tester=(\d+)/))
		hO.options.tester='tester='+matches[1];
	if (matches=page.match(/[?&]holderb=(\d+)&(s\d+&a\d+)/))
		hO.options.blockSet[matches[1]]=matches[2]

	hO.options[(self!=top)?'f':'h']=escape(page);
	if (!hO.flashVer())
		hO.options['noflash']=1;
	hO.protocol='http'+(wl.protocol=='https:'?'s':'')+'://';
	hO.host=hO.protocol+(H_DEV?'192.168.0.31:18108/':"h.holder.com.ua/");
	hO.isDomReady=false;
	hO.list=new hO.funcs();
	hO.onload(hO.ready);
	new hO.module('renderer',2);
	hO.proceedPlaces();
}
hO.flash = function(src, width, height, version, options, bn_url){
	var isObject=!!w.ActiveXObject;
	var html = '',widthHeight='width="'+(width||'100%')+'" height="'+(height||'100%')+'"';
	var params = hO.merge({},{allowScriptAccess:"always",wmode:"opaque"},options);
	if (typeof(bn_url)!='undefined')
		src += '?' + (typeof(flashVar)!='undefined'?flashVar:'bn_url')+'='+escape(bn_url);
	params[isObject ? 'movie' : 'src'] = src;
	for (i in params)
		html += isObject ? '<param name="' + i + '" value="' + params[i] + '">' : i + '="' + params[i] + '" ';
	return isObject ? '<object id="hO_' +Math.round(Math.random()*9999999) + '" ' + widthHeight + ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' + html + '<\/object>' :
		'<embed ' + widthHeight + ' ' + html + 'type="application/x-shockwave-flash"><\/embed>';
}
hO.img = function(href, options){
	var str = '';
	for(name in options)
		str+=' '+name+'="'+options[name]+'"'
	return '<a target="_blank" href="' + href + '"><img border="0"'+ str+'></a>';
}
hO.addElement	= function(tag, parent, style, html){
	var o = document.createElement(tag);
	hO.merge(o.style, style);
	if (parent)
		parent.appendChild(o);
	if (html)
		o.innerHTML = html;
	return o;
}
hO.addDiv =	function(parent, style, html){
	return hO.addElement("DIV", parent, style, html)
}
hO.switchVis=function(el){
	el.style.visibility=(el.style.visibility=='hidden')?'visible':'hidden';
}

hO.prototype.parseURL = function(bn_url)
{
	var match;
	if(match = this.options.bn_url.match(/(https?:\/\/[^\/]+\/).*&b([0-9]+)/)) {
		this.options.host = match[1];
		this.options.bannerID = match[2];
	}
}
hO.prototype.event = function(num){
	this.parseURL();
	if(num==0)num++;
	(new Image()).src=this.options.host+'e?tf&b'+this.options.bannerID+ '&e'+num+'&r'+Math.random();
}
w.holderPlaces.__push = w.holderPlaces.push;
w.holderPlaces.push = function (arg) {
	w.holderPlaces.__push(arg);
	hO.proceedPlaces();
}
hO.proceedPlaces=function(){
	while (w.holderPlaces.length) {
		place = w.holderPlaces.pop();
		new hO(place.place, place);
	}
}

if (typeof hO.version=='undefined')
	hO.start();
if (typeof window==="object" && typeof window.document==="object")
	window.holder = hO;
})(window);