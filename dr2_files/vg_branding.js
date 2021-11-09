var branding = {
    padTop:130,
    bgColor:'#fff',
    fixed:true,
    hwAlco:true,
    hwMed:false,
    hideSocial:false
};

function addEvent(e,t,f){
    if (e.addEventListener) {
        e.addEventListener(t, f, false);
    }
    else if (e.attachEvent) {
        e.attachEvent('on'+t, f);
    }
}

function removeEvent(e,t,f){
    if (e.removeEventListener) {
        e.removeEventListener(t, f, false);
    }
    else if (e.detachEvent) {
        e.detachEvent('on'+t, f);
    }
}

//addEvent(window,"message", catchMsg);
function catchMsg(e) {
    if (typeof e.data == 'string') {
        var str = e.data;
        if (str.indexOf('admBranding_padTop') != -1) {
            branding.padTop = str.split('_')[str.split('_').length-1];
        }
        if (str.indexOf('admBranding_bgColor') != -1) {
            branding.bgColor = str.split('_')[str.split('_').length-1];
        }
        if (str.indexOf('admBranding_fixed') != -1) {
            branding.fixed = str.split('_')[str.split('_').length-1];
        }
        if (str.indexOf('admBranding_hwAlco') != -1) {
            branding.hwAlco = str.split('_')[str.split('_').length-1];
            branding.hwAlco = (branding.hwAlco=='true')?true:false;
        }
        if (str.indexOf('admBranding_hwMed') != -1) {
            branding.hwMed = str.split('_')[str.split('_').length-1];
            branding.hwMed = (branding.hwMed=='true')?true:false;
        }

        if (e.data == 'admix_branding') {
            loadBranding();
            removeEvent(window,"message", catchMsg);
        }
    }
}

function loadBranding() {

    var html_brnd,
        html_brnd_first,
        topId = ['admixer_async_594993901',  //kiev
                'admixer_async_592461409',  //lvov
                'admixer_async_1093167236',  //kharkov
                'admixer_async_193696805',  //dnepr
                'admixer_async_1059619994',  //odessa
                'admixer_async_1790093492',  //zaporozhie
                'admixer_async_1659202238',  //poltava
                'admixer_async_698415745',  //crimea
                'admixer_top_kiev',  //kiev
                'admixer_top_lvov',  //lvov
                'admixer_top_kharkov',  //kharkov
                'admixer_top_dnepr',  //dnepr
                'admixer_top_odessa',  //odessa
                'admixer_top_zaporozhie',  //zaporozhie
                'admixer_top_poltava',  //poltava
                'admixer_top_crimea'];  //crimea
    for (var i=0; i<topId.length; i++) {
        if (document.getElementById(topId[i])) {
            html_brnd = document.getElementById(topId[i]);
            break;
        }
    }
    
    if (html_brnd) {
        if (html_brnd.firstChild) {
            html_brnd_first = html_brnd.firstChild;
            $(html_brnd_first).css({'max-width':'100%','max-height':'100%','min-width':'100%','min-height':'100%'});
        }
    } else {
        console.log('Function loadBranding stopped');
        console.log('Place holder id for TOP banner is not found in topId array');
        return;	
    }
    $(html_brnd).css({'top':'0px','position':'fixed','width':'100%','height':'100%','overflow': 'hidden','z-index':0,'max-width':'100%','max-height':'100%','min-width':'100%','min-height':'100%'});
    $('body').removeClass('without-b').addClass('branding');
    $('body').css({'padding-top':'0px'});
    $('body').append($(html_brnd));
    
    var content, footer;
    
    if ($('.sbody').length) {
        content = $('.sbody');
    }
    
    if ($('footer').length) {
        footer = $('footer');
    }
    
    if ($(content)) {
        $(content).css({'margin':branding.padTop + 'px auto 0px auto','width':'980px','position':'relative','z-index':1});
    }
    
    function addHealthWarning() {
        
        var hwDiv = document.createElement('div');
        $(footer).before($(hwDiv));
        $(hwDiv).css({
            'position': 'relative',
            'width': '980px',
            'height': '142px',
            'margin': '0 auto',
            'min-width': '980px',
            'max-width': '980px',
            'margin':'0px auto',
            'z-index':1,
            'background-color': '#fff',
            'background-image': (branding.hwAlco ? 'url(//i.holder.com.ua/h/1/2/282_pf2_1.jpg)' : branding.hwMed ? 'url(//i.holder.com.ua/h/5/6/266_pf1_1.jpg)' : ''),
            'background-repeat': 'no-repeat',
            'background-position': 'center top',
            'background-size': 'contain'
        });
    }
    
    if (branding.hwAlco || branding.hwMed) {
        addHealthWarning();
    }				

}