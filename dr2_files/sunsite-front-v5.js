var root_domain = root_domain || location.hostname;
var http_addr = document.location.protocol + '//' + root_domain;
var prevAjax;
var actions_post = {};
var actions_url = [];

var sunsite_anchor = '';
var sunsite_loaded = sunsite_loaded || '';

var loaded_files = [];
var my_callbacks_index = 0;
var my_callbacks = [], my_callbacks_sources = [];
var sunsite_inits = [];

file_ext = function(fname) {
    var re = /(?:\.([^.]+))?$/;
    return re.exec(fname)[1];
};

in_array = function(needle, haystack, strict) {
    var found = -1, key, strict = !!strict;
    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = key;
            break;
        }
    }
    return found;
};

function ajax(url, callback, data, x) {
    try {
        x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
        x.open(data ? 'POST' : 'GET', url, 1);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        x.onreadystatechange = function () {
            x.readyState > 3 && callback && callback(x.responseText, x);
        };
        x.send(data)
    } catch (e) {
        window.console && console.log(e);
    }
};

var css_ind = 1;
load_srcs = function(srcs, callback) {
    var callback_needed = true;
    my_callbacks_index++;
    my_callbacks[my_callbacks_index] = callback;
    my_callbacks_sources[my_callbacks_index] = [];
    var html = document.getElementsByTagName("html")[0];

    if (!typeof srcs === 'object' ) {
        return;
    }
    if (Array.isArray(srcs)) {
        var mysrcs = srcs;
    } else {
        var mysrcs = [srcs];
    }
    for(var x in mysrcs) {
        var href = mysrcs[x];
        if (file_ext(href) == 'js') {
            if (typeof(loaded_files[href]) == "undefined") {
                my_callbacks_sources[my_callbacks_index].push(href);
                callback_needed = false;
                if (loaded_files[href] === false) {
                    continue;
                } else {
                    loaded_files[href] = false;
                }

                var head = document.getElementsByTagName("head")[0];
                var script = document.createElement("script");
                script.type = 'text/javascript';
                script.async = true;
                script.cache = true;
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            var sript_src = this.src.replace(location.protocol + '//' + location.host, '');
                            loaded_files[sript_src] = true;
                            part_loaded(sript_src);
                        }
                    }
                } else {
                    script.onload = function () {
                        var sript_src = this.src.replace(location.protocol + '//' + location.host, '');
                        loaded_files[sript_src] = true;
                        part_loaded(sript_src);
                    }
                }
                script.src = href;
                head.appendChild(script);
            } else if (loaded_files[href] === false) {
                my_callbacks_sources[my_callbacks_index].push(href);
                callback_needed = false;
            }
        } else if (file_ext(href) == 'css') {
            if (typeof(loaded_files[href]) == "undefined") {
                loaded_files[href] = true;
                var style = document.createElement('style');
                html.appendChild(style);
                style.setAttribute('id', 'asyncInlineStyle' + css_ind);

                (function(h,i){
                    ajax(h, function(data){
                        document.getElementById('asyncInlineStyle' + i).innerText = data;
                    });
                })(href, css_ind);
                css_ind ++;
            }
        }
    }

    if (callback_needed && callback) {
        my_callbacks[my_callbacks_index] = false;
        callback();
    }
};

function part_loaded(script_src) {
    for(var x in my_callbacks_sources) {
        var position = in_array(script_src, my_callbacks_sources[x]);
        if (position >= 0) {
            my_callbacks_sources[x].splice(position, 1);
        }

        if (my_callbacks_sources[x].length <= 0 && my_callbacks[x]) {
            my_callbacks[x]();
            my_callbacks[x] = false;
        }
    }
}

function loadPage(url, divclass) {
    NProgress.done();
    NProgress.start();
    if (prevAjax) {
        prevAjax.abort();
    }
    prevAjax = $.ajax({
        url: url,
        dataType: 'html',
        xhrFields: {
            onprogress: function (e) {
                if (e.lengthComputable) {
                    NProgress.set(e.loaded / e.total);
                }
            }
        },
        success: function (response) {
            sunsite_before_load();
            var result = document.createElement( 'html' );
            var clear_result = document.createElement( 'html' );
            result.innerHTML = clear_result.innerHTML = response;

            if (typeof(divclass) == 'undefined') {
                divclass = 'sbody';
            }
            var clear_scripts = clear_result.getElementsByTagName('script');
            for(var x in clear_scripts) {
                //if (typeof clear_scripts[x] !== 'undefined') {} fix undefined
                if (typeof clear_scripts[x] !== 'undefined') {
                    if (clear_scripts[x].id) {
                        clear_scripts[x].parentNode.removeChild(clear_scripts[x]);
                    }
                }
            }
            document.title = result.getElementsByTagName('title').item(0).innerHTML;
            var meta_description = $(result).find('meta[name=description]').attr('content');
            if(typeof meta_description !== 'undefined') {
                $('meta[name=description]').attr('content', meta_description);
            }

            $('.js-meta').remove();
            $(result).find('.js-meta').each(function() {
                $('head').append($(this));
            });

            $('div.'+divclass).html(clear_result.getElementsByClassName(divclass).item(0).innerHTML);
            // Вставляєм скріпти з id в head
            var scripts = result.getElementsByTagName('script');
            for(var x in scripts) {
                if (typeof scripts[x] !== 'undefined') {
                    if (scripts[x].id) {
                        $("#" + scripts[x].id).remove();
                        $("head").append(scripts[x]);
                    }
                }
            }
            NProgress.done();
            if (typeof ga == 'function') {
                ga('send', 'pageview', location.pathname);
            }
            sunsite_after_load();
        },
        complete: function (response, status) {
            if (status == "error") {
                var result = document.createElement( 'html' );
                result.innerHTML = response.responseText;
                if (typeof(div) == 'undefined') {
                    div = 'sbody';
                }
                $('div.'+div).html(result.getElementsByClassName(div).item(0).innerHTML);
                document.title = result.getElementsByTagName('title').item(0).innerHTML;
                var scripts = result.getElementsByTagName('script');
                for(var x in scripts) {
                    if (scripts[x].id) {
                        $("head").append(scripts[x]);
                    }
                }
                NProgress.done();
                sunsite_after_load();
            }
        }
    });
}

function sunsite_actions() {
    $('.sunsite_actions').each(function () {
        if ($(this).data('action')) {
            if ($.inArray($(this).data('action'), actions_url) == -1) actions_url.push($(this).data('action'));
            if (!actions_post[$(this).data('action')]) actions_post[$(this).data('action')] = [];
            actions_post[$(this).data('action')].push($(this).data());
        }
    });
    if (actions_url.length > 0) {
        $.ajax({ type: 'POST', xhrFields: { withCredentials: true }, url: http_addr + (location.port != '' ? ':' + location.port : '') + sunsite_lang + '/actions/'+actions_url.join('/'), data: actions_post, dataType: 'json',
            success: function(data, textStatus, XMLHttpRequest) {
                data = (typeof data == 'string' ? $.parseJSON( data ) : data);
                for(var action in data){
                    if (data[action] && data[action]['success']) {
                        if (typeof window['sunsite_action_'+action] === "function") {
                            window['sunsite_action_'+action](data[action].result);
                        } else {
                            console.log("Action's handler not founded! Action = "+action);
                        }
                    } else {
                        console.log("Action result id false! Action = "+action);
                    }
                }
                actions_url = [];
                actions_post = {};
            }
        });
    }
}

function sunsite_before_load() {}

function sunsite_after_load() {
    sunsite_actions();
    for(var init in sunsite_inits){
        if (typeof sunsite_inits[init] === "function") {
            sunsite_inits[init]();
        }
    }
}

var profile_data;
var editor_data = [];
var sunsite_action_profile = function(data){
    data = typeof data === 'string' ? JSON.parse(data) : data;
    profile_data = data;

    if(typeof sunsite_action_profile_client === 'function'){ 
        sunsite_action_profile_client(data); 
    }

    if (typeof(data.groupid) !== 'undefined') {
        if (data.groupid & 8 | data.groupid & 2){
            $('[data-edit]').each(function () {
                var $this = $(this);
                var edit =  ($this.data('edit') || '').split(',');
                if ($this.next('.js-edit').length === 0) {
                    $this.after('<a target="_blank" href="' + http_addr + '/sunsite/content/maintree/article/a' +
                        edit[0] + '/' + edit[1] + '.html" data-set="' + ($this.data('edit') || '') + '" class="js-edit">✎</a>');
                }
            });
            $('.js-edit').hover(function() {
                var $this = $(this);
                var absnum = parseInt((($this.data('set') || '').split(','))[0]) || 0;
                if (absnum > 0) {
                    if (typeof editor_data[absnum] != 'undefined') {
                        show_editor_info($this, editor_data[absnum]);
                    } else {
                        $.get('https://vgorode.ua/sunsite/actions/article_info/', {absnum: absnum}, function(info) {
                            var info = typeof info === 'string' ? JSON.parse(info) : info;
                            if (info.article_info.success) {
                                editor_data[absnum] = info.article_info.result;
                                show_editor_info($this, editor_data[absnum]);
                            }
                        });
                    }
                }
            }, function() {
                hide_editor_info();
            });
        }
    }
};

function show_editor_info($el, data) {
    var offs = $el.offset();
    if ($('#popup-editor-info').length == 0) {
        $('<div/>', {'id': 'popup-editor-info'}).appendTo($('body:eq(0)'));
    }
    $('#popup-editor-info').html(
        '<ul>'
        + '<li style="margin-bottom: 4px;"><strong>Просмотров:</strong><span style="margin-left: 5px;">' + (data.views || 0) + '</span></li>'
        + '<li style="margin-bottom: 4px;"><strong>Создано:</strong><span style="margin-left: 5px;">' + (data.created || '') + '</span></li>'
        + '<li style="margin-bottom: 4px;"><strong>Модифицировано:</strong><span style="margin-left: 5px;">' + (data.changed || '') + '</span></li>'
        + '<li style="margin-bottom: 4px;"><strong>Автор:</strong><span style="margin-left: 5px;">' + (data.firstname + ' ' + data.lastname) + '</span></li>'
        +'</ul>'
    ).css({
        'left': parseInt(offs.left + 30) + 'px',
        'top': parseInt(offs.top) + 'px',
        'position': 'absolute',
        'background': '#fff',
        'border': '1px solid #133BBE',
        'border-radius': '2px',
        'padding': '10px',
        'z-index': 1000
    }).show();
}

function hide_editor_info() {
    $('#popup-editor-info').hide();
}

load_srcs(['/user/js/jquery-3.3.1.min.js'],function(){
    is_mobile = $(window).width() <= 1024;
    $(window).resize(function() {
        is_mobile = $(window).width() <= 1024;
    });
    sunsite_actions();
    load_srcs(['/user/js/jquery.history.js', '/user/js/nprogress.min.js', '/user/css/nprogress.css'], function() {
        $('body:eq(0)').on('click', 'a', function(event) {
            var $this = $(this);
            var href = $this.attr('href') || '';
            var component_url = href.split(/[#]/);

            if($this.is('[data-lightbox]')){
                return false;
            }

            if(component_url.length > 1){
                href = component_url[0];
                sunsite_anchor = component_url[1];

                if(href.length == 0){
                    href = window.location.pathname;
                }

                if(href == window.location.pathname) {
                    sunsite_loaded = location.protocol + '//' + location.host + href;
                    window.location.hash = '#' + sunsite_anchor;
                    sunsite_anchor = '';

                    return false;
                }
            }

            if (event.ctrlKey || event.which == 2) {
                window.open((href.indexOf('http') != 0 ? location.protocol + '//' + location.host : '') + href,'_blank');
                return false;
            }

            if ( href == '' || href.substr(0, 1) == '#' ){
                return false;
            } else if ( $this.prop('download') || ['_blank', '_parent', '_top'].indexOf($this.attr('target') || '') != -1) {
                return true;
            }

            if((['jpg', 'jpeg', 'png', 'pdf', 'gif', 'webp'].indexOf(href.split('.').pop()) != -1)){
                return false;
            }

            if (((href.substr(0, 2) !== '//' && href.substr(0, 1) === '/') || href.indexOf(location.protocol + '//' + location.host) == 0)) {
                event.preventDefault();
                if(typeof Waypoint !== 'undefined') {
                    Waypoint.destroyAll();
                }
                window.History.pushState(null, document.title, decodeURIComponent(href));
                if($(window).scrollTop() > 355) {
                    $('html, body').animate({scrollTop: 0}, 'fast');
                }

                return true;
            } else if (location.host.indexOf(root_domain) != -1) {
                window.location = href;
                return true;
            } else {
                return true;
            }
        });

        var History = window.History;

        window.onpopstate = function (e) {
            var State = History.getState();
            var component_url = State.url.split(/[#]/);

            if(component_url.length > 1) {
                State.url = component_url[0];
            }

            if(sunsite_loaded != State.url) {
                sunsite_loaded = State.url;
                loadPage(State.url);
            }
        };

    });
});

if (typeof loadsrcscache == 'object') {
    for (var i in loadsrcscache) {
        load_srcs(loadsrcscache[i][0], loadsrcscache[i][1]);
    }
}
