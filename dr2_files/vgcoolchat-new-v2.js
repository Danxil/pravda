    var chat_room_block = function(block_id) {
        this.block_id = block_id;
        this.cblock = $('#cr' + block_id);
        this.$msgs = this.cblock.find('.chat-mes-cnt');
        this.first_message = false;
    }

    chat_room_block.prototype.add_message = function(msg, avatar, ts, uname, first_message = false) {
        avatar = (typeof(avatar) !== 'undefined') ? '//vgorode.ua' + avatar : '/user/img/noava.png';
        date = (typeof(ts) !== 'undefined') ? ts : Date.now();
        sender = (typeof(uname) !== 'undefined') ? uname : 'Unknown';

        avatar += '?t=' + Date.now();

        if(typeof(this.$msgs) !== 'undefined') {
            if(this.first_message) {
                this.$msgs.empty();
                this.first_message = false;
            }

            this.first_message = first_message;

            this.$msgs.append(
                this.create_msg({ 
                    ava: avatar, 
                    date: this.timeConverter(date), 
                    sender: sender, 
                    body: msg
                })
            );

            //this.$msgs.parent().mCustomScrollbar({ setTop: hsk + "px" });*/
            this.$msgs.parent().scrollTop(this.$msgs.prop("scrollHeight"));
        }
    }

    chat_room_block.prototype.clear = function() {
        this.$msgs.empty();
    }

    chat_room_block.prototype.create_msg = function(msg) {
        return '<div class="chat-mes" style="width: 280px;">' +
        '<div class="avatar">' +
            '<img src="' + msg.ava + '" alt="ava">' +
        '</div>' +
        '<div class="chat-mes-in">' +
        '<div class="date">' +
            '<a href="">' + msg.date + '</a>' +
        '</div>' +
        '<div class="chat-mes-gray">' +
        '<div class="chat-mes-name">' + msg.sender + '</div>' +
        '<div class="chat-mes-txt" style="word-wrap: break-word">'
            + msg.body +
        '</div>' +
        '<div class="chat-mes-intv-line">' +
        '<div class="cht-m-ls">' +
        '</div>' +
        '<div class="cht-m-rs">' +
        '</div></div></div></div></div>';
    }

    chat_room_block.prototype.hide_input = function() {
        this.cblock.find('.js-chat').hide();
        this.cblock.find('.chat-send-btn').hide();
        this.cblock.find('.for-logo').hide();
    }

    chat_room_block.prototype.setup_input = function(room_sid = null) {
        let $cinput = $('#cr' + room_sid).find('.js-chat');
        let $cbutton = $('#cr' + room_sid).find('.chat-send-btn');

        $cbutton.click(function() {
            if($cinput.val() != '') {
                $.ajax({ url: "https://vgorode.ua/actions/send", xhrFields: { withCredentials: true }, method: 'POST', data: { absnum: room_sid, message : $cinput.val() } });
                $cinput.val('');    
            }    
        });

        $cinput.on('keypress', function(e) {
            if(e.which == 13 && $cinput.val() != '') {
                $.ajax({ url: "https://vgorode.ua/actions/send", xhrFields: { withCredentials: true }, method: 'POST', data: { absnum: room_sid, message : $cinput.val() } });
                $cinput.val(''); 
            }
        });
    }

    chat_room_block.prototype.timeConverter = function(UNIX_timestamp){
        var a = new Date(UNIX_timestamp);

        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = ('0' + a.getMinutes()).slice(-2);
        var time = date + ' ' + month + ' ' + hour + ':' + min;

        return time;
    }

    function chat_sizes() {
        // рекламный блок, верх
        let reclamBl = $('#ar' + chat_current); 

        // чат блок, низ
        let chatBl = $('#cr' + chat_current);

        // mobile
        if($(window).width() < 993) {
            chatBl.removeClass('fixed absolute');
            return;
        } else {
            if(!chatBl.hasClass('unshow') && !chatBl.hasClass('fixed')){
                chatBl.addClass('unshow fixed');
            }
        }

        chatParent = chatBl.parent();
        espace = chatParent.height() - reclamBl.height();

        if(!reclamBl.get(0) || !chatBl.get(0)) return;

        if(chatBl.height() > espace) {
            chatBl.find('.chat-bl').height(espace);
            chatBl.find('.chat-mes-bl').height(espace - 50);
            chatBl.find(".chat-mes-bl").scrollTop(chatBl.find(".chat-mes-bl").prop("scrollHeight"));
        }

        reclamBlBottom = reclamBl.get(0).getBoundingClientRect().bottom + $(window).scrollTop();
        chatParentBottom = chatParent.get(0).getBoundingClientRect().bottom + $(window).scrollTop() - chatBl.outerHeight(true) - 25;

        if (chatBl.hasClass('fixed') && window.pageYOffset < reclamBlBottom) {
            chatBl.removeClass('fixed');
        } else if (window.pageYOffset > reclamBlBottom && chatParentBottom > window.pageYOffset) {
            chatBl.addClass('fixed');
            chatBl.removeClass('absolute');
        } else if (window.pageYOffset > chatParentBottom) {
            chatBl.removeClass('fixed');
            chatBl.addClass('absolute');
        }
    }

    function add_sized_chat(id) {
        chat_current = id;
        console.log('now is:' + id);
    }

    load_ads = function(article) {
        actions_post = {};
        actions_url = [];

        $('#art_' + article).find('.sunsite_actions[data-action="banners"]').each(function () {
            if ($(this).data('action')) {
                if ($.inArray($(this).data('action'), actions_url) == -1) actions_url.push($(this).data('action'));
                if (!actions_post[$(this).data('action')]) actions_post[$(this).data('action')] = [];
                actions_post[$(this).data('action')].push($(this).data());
            }
        });

        if (actions_url.length > 0) {
            $.ajax({ type: 'POST', xhrFields: { withCredentials: true }, url: 'https://vgorode.ua'+ (location.port != '' ? ':' + location.port : '') + sunsite_lang + '/actions/'+actions_url.join('/'), data: actions_post, dataType: 'json',
                success: function(data, textStatus, XMLHttpRequest) {
                    data = (typeof data == 'string' ? $.parseJSON( data ) : data);
                    for(var action in data){
                        if (data[action] && data[action]['success']) {
                            tdata = data[action].result

                            if(typeof admixerML == 'object'){
                                var check_premium = /admixer_premium/gi;
                                var check_top = /admixer_top/gi;
                                for(key_b in admixerML.banners){
                                    if(key_b.match(check_premium) || key_b.match(check_top)){
                                        delete admixerML.banners[key_b]
                                    }
                                }
                            }

                            if(typeof(window.holder) !== 'undefined') {
                                window.holder.start();
                            }

                            var $place, w = $(window).width();
                            var valid_banners = [];
                            var is_mobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
                            banners_data = tdata;

                            if( tdata.length == 0 ) {
                                return false;
                            }

                            for( var i in tdata ) {
                                valid_banners[i] = [];
                                $place = false;
                                
                                $('#art_' + article).find( 'div[data-place="' + i + '"]' ).empty().each(function(){
                                    var $this = $(this);
                                    $place = $this;

                                    var s = $this.data('screen') || '';
                                    var r = $this.data('repeat') || false;

                                    if (r) {
                                        $place = $( 'div[data-place="' + i + '"]' );
                                    } else if (s == '') {
                                        $place = $this;
                                    } else {
                                        s = s.split(',');
                                        if (w > parseInt(s[0]) && w <= parseInt(s[1])) {
                                            $place = $this;
                                        }
                                    }
                                });

                                if ($place) {
                                    var banner = false;

                                    for( var j in tdata[i] ) {
                                        if (tdata[i][j].screen_width[0] < w && tdata[i][j].screen_width[1] >= w) {
                                            valid_banners[i].push(tdata[i][j]);
                                        }
                                    }

                                    if (valid_banners[i].length > 1) {
                                        var tmp = [];
                                        for (var k in valid_banners[i]) {
                                            tmp[k] = parseInt(valid_banners[i][k]['priority']);
                                        }
                                        banner = valid_banners[i][randbyweight(tmp)];
                                    } else if (typeof valid_banners[i][0] !== 'undefined') {
                                        banner = valid_banners[i][0];
                                    }

                                    if (banner) {
                                        if (parseInt(banner.type) === parseInt(banners_types['script']) || parseInt(banner.type) === parseInt(banners_types['html'])) {
                                            $place.append( '<div class="banner">' + banner.banner_code + '</div>' );
                                        } else {
                                            $place.append( '<div class="banner"><a href="' + banner.url + '" target="_blank"><im' + 'g src="' + server + banner.file + '"></a></div>' );
                                        }
                                    }
                                }
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