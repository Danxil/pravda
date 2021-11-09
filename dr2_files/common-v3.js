"use strict";
jQuery(document).ready(function ($) {
  $('input,textarea').focus(function () {
    $(this).data('placeholder', $(this).attr('placeholder'))
    $(this).attr('placeholder', '');
  });
  $('input,textarea').blur(function () {
    $(this).attr('placeholder', $(this).data('placeholder'));
  });

  /*var num = 8,
  ang = -360 / num,
  rad = num * 1.25,
  run = 2;

  if ($('div').hasClass('loding-line')) {
    function setup() {
      for (var i = 0; i < num; i++) {
        var button = document.createElement('div');
        button.className = "dot" + i + " dot";
        button.style.top = rad * Math.cos(ang * i * Math.PI / 180) - 10 + "px";
        button.style.left = rad * Math.sin(ang * i * Math.PI / 180) - 10 + "px";
        button.style.webkitAnimation =
          "osc " + run + "s ease-in-out infinite " + i / (num / 2) + "s, rainbow 2.5s infinite linear " + i / (num / 2) + "s";
        button.style.animation =
          "osc " + run + "s ease-in-out infinite " + i / (num / 2) + "s, rainbow 2.5s infinite linear " + i / (num / 2) + "s";
        document.getElementById("hold").appendChild(button);
      }
    }
    setup();
  }*/

  var mW = $(window).width();
  var carouselControlPrev = $('.carousel-control-prev')
  var carouselControlPrev2 = $('.carousel-control-next')
  var carouselIndicators = $('.carousel-indicators')
  var slsl = $('#slsl')
  var faceBlock = $('.fb-page')
  var mobSliderNews = $('.mob-slider-for-art.mob-slider-for-art .container .row')

  // var mobSblock = $('.mob-slider-m')
  var withAdContainer = $('.without-b .for-cont-with-ad')
  var timeline = $('.without-b .timeline-news-bl.ch-p')
  var movArtbl = $('.movies-arts-bl .col-md-2')

  var ht = $('.half-text')
  var mbutn = $('.half-text .more')
  var sfbtn = $('.show-filtr-btn')
  var filtersList = $('.serch-with-filtrs .drop-downs-bl')
  var sliderForInfo = $('#slider-for-info')
  var searchModal = $('.search-modal');
  var mapModal = $('.map-modal');

  var scrolChat = $('.chat-mes-bl');
  var chatBl = $('.chat-bl');

  var messHeightBl = $('.chat-mes-cnt').height();

  var messIntBl = $('.chat-mes-bl .chat-mes');

  var buttonForShowAllChat = $('.status-show-chat');
  var zagolChat = $('.zagol-chat');

  var mobileMenuModal = $('.mobile-modal');
  var signInModal = $('.sign-in-m-sec');
  var reclamaBlock = $('.reclama');
  var dynamicClas = $('.dynamic-arts');



  /*
  $(".call-mob-menu-btn").click(function () {
    $('#barOne').toggleClass("left");
    $('#barTwo').toggleClass("right");
    $('#barThree').toggleClass("down");
    $('.close').toggleClass("closeUp");
    mobileMenuModal.toggleClass('is-show')
  });
  */
  /*$('.btn-serch-im, .search-modal .close').click(function () {
    searchModal.toggleClass('is-show')
    if (searchModal.hasClass('is-show')) {
      searchModal.css({
        'z-index': '999'
      })
      $('.serch-modal-input-line input').focus()
    } else {
      searchModal.css({
        'z-index': '-2'
      })
    }
  })*/
  if ($('div').hasClass('serch-movie-line')) {
    $('.input-focus').focus()
  }
  /*$('.show-on-map-md, .map-modal .close, .set-place').click(function () {
    event.preventDefault();
    mapModal.toggleClass('is-show')
    if (mapModal.hasClass('is-show')) {
      mapModal.css({
        'z-index': '999'
      })
    } else {
      mapModal.css({
        'z-index': '-2'
      })
    }
  })*/
  $('.chat-send-btn, .sign-in-m-sec .close').click(function () {
    event.preventDefault();
    signInModal.toggleClass('is-show')
    if (signInModal.hasClass('is-show')) {
      signInModal.css({
        'z-index': '999'
      })
    } else {
      signInModal.css({
        'z-index': '-2'
      })
    }
  })
  if (ht.hasClass('no-aft')) {
    mbutn.css({
      'display': 'none'
    })
    $('.more.hidn-more').css({
      'display': '-webkit-flex',
      'display': '-moz-flex',
      'display': '-ms-flex',
      'displa': '-o-flex',
      'display': 'flex'
    })
  } else {
    mbutn.css({
      'display': '-webkit-flex',
      'display': '-moz-flex',
      'display': '-ms-flex',
      'displa': '-o-flex',
      'display': 'flex'
    })
    $('.more.hidn-more').css({
      'display': 'none'
    })
  }
  mbutn.click(function () {
    ht.toggleClass('no-aft')
    if (ht.hasClass('no-aft')) {
      mbutn.css({
        'display': 'none'
      })
      $('.more.hidn-more').css({
        'display': '-webkit-flex',
        'display': '-moz-flex',
        'display': '-ms-flex',
        'displa': '-o-flex',
        'display': 'flex'
      })
    } else {
      mbutn.css({
        'display': '-webkit-flex',
        'display': '-moz-flex',
        'display': '-ms-flex',
        'displa': '-o-flex',
        'display': 'flex'
      })
      $('.more.hidn-more').css({
        'display': 'none'
      })
    }
  })
  if (filtersList.hasClass('unshow')) {
    sfbtn.css({
      'display': 'block'
    })
    $('.show-filtr-btn.hid-fltrs').css({
      'display': 'none'
    })
    sfbtn.addClass('mt')
  } else {
    sfbtn.css({
      'display': 'none'
    })
    $('.show-filtr-btn.hid-fltrs').css({
      'display': 'block'
    })
    sfbtn.removeClass('mt')
  }
  sfbtn.click(function () {
    filtersList.toggleClass('unshow')
    if (filtersList.hasClass('unshow')) {
      filtersList.slideUp('500', function () {
        sfbtn.css({
          'display': 'block'
        })
        $('.show-filtr-btn.hid-fltrs').css({
          'display': 'none'
        })
        sfbtn.addClass('mt')
      });
    } else {
      filtersList.slideDown('500', function () {
        sfbtn.css({
          'display': 'none'
        })
        $('.show-filtr-btn.hid-fltrs').css({
          'display': 'block'
        })
        sfbtn.removeClass('mt')
      });
    }
  })
  $('.podpiska-btn').click(function () {
    $('.bef-send-f').css({
      'display': 'none'
    })
    $('.chatbot-mail-podpiska-line > form').css({
      'display': 'none'
    })
    $('.after-form-send-bl').css({
      'display': '-webkit-flex',
      'display': '-moz-flex',
      'display': '-ms-flex',
      'display': '-o-flex',
      'display': 'flex'
    })
  })

  if ($('div').hasClass('chat-mes')) {
    scrolChat.scrollTop(messIntBl.last().offset().top);
  }

  if (mW > 1100) {
    timeline.parent().attr('class', 'col-lg-12')
  }

  if (mW > 1050) {
    withAdContainer.addClass('col-lg-8')
  }
  if (mW < 991) {
    faceBlock.detach()
    var heightForMobChatBl = zagolChat.height()
    chatBl.css({
      'height': heightForMobChatBl
    })
    if (chatBl.hasClass('show')) {
      buttonForShowAllChat.css({
        'display': '-webkit-flex',
        'display': '-moz-flex',
        'display': '-ms-flex',
        'display': '-o-flex',
        'display': 'flex'
      })
      $('.status-show-chat.hidn-cht').css({
        'display': 'none'
      })
    } else if (chatBl.hasClass('unshow')) {
      buttonForShowAllChat.css({
        'display': 'none'
      })
      $('.status-show-chat.hidn-cht').css({
        'display': '-webkit-flex',
        'display': '-moz-flex',
        'display': '-ms-flex',
        'display': '-o-flex',
        'display': 'flex'
      })
    }
    buttonForShowAllChat.click(function () {
      if (chatBl.hasClass('show')) {
        chatBl.css({
          'height': heightForMobChatBl
        });
        chatBl.removeClass('show');
        chatBl.addClass('unshow');
        buttonForShowAllChat.css({
          'display': '-webkit-flex',
          'display': '-moz-flex',
          'display': '-ms-flex',
          'display': '-o-flex',
          'display': 'flex'
        })
        $('.status-show-chat.hidn-cht').css({
          'display': 'none'
        })
      } else if (chatBl.hasClass('unshow')) {
        chatBl.css({
          'height': '100%'
        });
        chatBl.removeClass('unshow');
        chatBl.addClass('show');
        buttonForShowAllChat.css({
          'display': 'none'
        })
        $('.status-show-chat.hidn-cht').css({
          'display': '-webkit-flex',
          'display': '-moz-flex',
          'display': '-ms-flex',
          'display': '-o-flex',
          'display': 'flex'
        })
      }
    })
  }

  if (mW > 1200) {
    if ($('div').hasClass('plus-news-bl')) {
      var plusNewsParnt = $('.plus-news-bl').parent();
      var wParent = plusNewsParnt.width();
      var plusNewsBlTop = $('.plus-news-bl').get(0).getBoundingClientRect().top + $(window).scrollTop();
      var plusNewsParntBottom = plusNewsParnt.get(0).getBoundingClientRect().bottom + $(window).scrollTop() - $('.plus-news-bl').outerHeight(true);

      $(window).scroll(function () {
        if ($('.plus-news-bl').hasClass('fixed') && window.pageYOffset < plusNewsBlTop) {
          $('.plus-news-bl').removeClass('fixed');
        } else if (window.pageYOffset > plusNewsBlTop && plusNewsParntBottom > window.pageYOffset) {
          $('.plus-news-bl').addClass('fixed');
          $('.plus-news-bl').removeClass('absolute');
        } else if (window.pageYOffset > plusNewsParntBottom) {
          $('.plus-news-bl').removeClass('fixed');
          $('.plus-news-bl').addClass('absolute');
        }
      })
    }
  }

  if (mW > 991) {
    var forWidthCont = $('.session-time-bl').width();
    var btnsContainer = $('.timeline-news-bl.dynamic-btns-bl');
    var tempElemBtns;
    var dropDownMenu = $('.timeline-news-bl .d-d-dynamic-menu .dropdown-menu')
    var dropDownMenuIttem = $('.timeline-news-bl .d-d-dynamic-menu .dropdown-menu .dropdown-item')
    var btnsContainer2 = $('.razdel-art-btns-line .dynamic-btns-bl');
    var tempElemBtns2;
    var dropDownMenu2 = $('.razdel-art-btns-line .d-d-dynamic-menu .dropdown-menu')
    var dropDownMenuIttem2 = $('.razdel-art-btns-line .d-d-dynamic-menu .dropdown-menu .dropdown-item')

    if ($('div').hasClass('dynamic-btns-bl')) {
      if (forWidthCont < btnsContainer.width()) {
        $('.timeline-news-bl .d-d-dynamic-menu').css({
          'display': 'inline-block'
        })
        do {
          tempElemBtns = $('.timeline-news-bl.dynamic-btns-bl .for-timeline-btn-bl').last().detach();
          $('<div class="dropdown-item"></div>').appendTo(dropDownMenu)
          // tempElemBtns.appendTo('.d-d-dynamic-menu .dropdown-menu')
          tempElemBtns.children().appendTo($('.timeline-news-bl .d-d-dynamic-menu .dropdown-menu .dropdown-item').last())
        } while (forWidthCont < btnsContainer.width())
      }
      if (forWidthCont < btnsContainer2.width()) {
        $('.razdel-art-btns-line .d-d-dynamic-menu').css({
          'display': 'inline-block'
        })
        do {
          tempElemBtns2 = $('.razdel-art-btns-line .dynamic-btns-bl > button').last().detach();
          // $('<div class="dropdown-item" href="#"></div>').appendTo(dropDownMenu2)
          // tempElemBtns.appendTo('.d-d-dynamic-menu .dropdown-menu')
          tempElemBtns2.appendTo(dropDownMenu2)
        } while (forWidthCont < btnsContainer2.width())
      }
    }

    //????????????zagruzka posle vupulneniya??????????????????????????
    $('.reclama img').ready(function () {
      /*if ($('div').hasClass('chat-bl')) {
        var chatParent = chatBl.parent();
        var widthParent = chatParent.width();
        chatBl.css({
          'width': widthParent
        })
        var reclamBl = $('.reclama');
        var reclamBlBottom = reclamBl.get(0).getBoundingClientRect().bottom + $(window).scrollTop();
        var chatParentBottom = chatParent.get(0).getBoundingClientRect().bottom + $(window).scrollTop() - chatBl.outerHeight(true) - 25;
        chatBl.css({
          'display': 'none'
        })
        var chatParentHeight = chatParent.height();
        var reclamBlHeight = reclamBl.outerHeight(true);
        var chtPreclamBlDistance = chatParentHeight - reclamBlHeight - 50;

        var maxHmesBl;
        chatBl.css({
          'display': 'block'
        })
        var zaglChath = $('.zagol-chat').outerHeight(true);
        var chatSendLh = $('.chat-send-line').outerHeight(true);
        var distToMesBl = zaglChath + chatSendLh;
        if ($(window).height() > chtPreclamBlDistance) {
          chatBl.css({
            'height': chtPreclamBlDistance + 'px'
          })
          maxHmesBl = chatBl.height() - distToMesBl
        } else {
          var heightForChat = $(window).height() - 50;
          chatBl.css({
            'height': heightForChat + 'px'
          })
          maxHmesBl = chatBl.height() - distToMesBl
        }
        $('.chat-mes-bl').css({
          'max-height': maxHmesBl + 'px'
        })

        $(window).resize(function () {
          chatParentHeight = chatParent.height();
          reclamBlHeight = reclamBl.outerHeight(true);
          chtPreclamBlDistance = chatParentHeight - reclamBlHeight;
          if ($(window).height() > chtPreclamBlDistance) {
            chatBl.css({
              'height': chtPreclamBlDistance + 'px'
            })
            maxHmesBl = chatBl.height() - distToMesBl
          } else {
            var heightForChat = $(window).height();
            chatBl.css({
              'height': heightForChat + 'px'
            })
            maxHmesBl = chatBl.height() - distToMesBl
          }
          $('.chat-mes-bl').css({
            'max-height': maxHmesBl + 'px'
          })
        })
      }*/
    })

    if ($('div').hasClass('dubl-block-for-afisha')) {
      var nameEvent = $('.caption-news').text();
      $('.dubl-block-for-afisha .n-event').text(nameEvent)
      var dateForEvent = $('.abou-event-txt.d-f-evnt').text();
      $('.dubl-block-for-afisha .date-event .abou-event-txt').text(dateForEvent);
      var afishaBl = $('.dubl-block-for-afisha');
      var dbAfishaPern = afishaBl.parent();
      var widthParentdbAfisha = dbAfishaPern.width();
      afishaBl.css({
        'width': widthParentdbAfisha
      })
      var eventBl = $('.event-bl');
      var eventBlBottom = eventBl.get(0).getBoundingClientRect().bottom + $(window).scrollTop();
      var eventParentBottom = dbAfishaPern.get(0).getBoundingClientRect().bottom + $(window).scrollTop() - afishaBl.outerHeight(true);

      $(window).scroll(function () {
        if (window.pageYOffset < eventParentBottom && eventBlBottom < window.pageYOffset) {
          afishaBl.fadeIn()
        } else {
          afishaBl.fadeOut()
        }
      })
    }

    //??????????????????????????????????
    $(window).resize(function () {
      if ($('div').hasClass('chat-bl')) {
        var chatParent = chatBl.parent();
        var widthParent = chatParent.width();
        chatBl.css({
          'width': widthParent
        })
      }

      forWidthCont = $('.session-time-bl').width();
      if ($('div').hasClass('dynamic-btns-bl')) {
        if (forWidthCont < btnsContainer.width()) {
          $('.timeline-news-bl .d-d-dynamic-menu').css({
            'display': 'inline-block'
          })
          do {
            tempElemBtns = $('.timeline-news-bl.dynamic-btns-bl .for-timeline-btn-bl').last().detach();
            $('<div class="dropdown-item"></div>').appendTo(dropDownMenu)
            // tempElemBtns.appendTo('.d-d-dynamic-menu .dropdown-menu')
            tempElemBtns.children().appendTo($('.timeline-news-bl .d-d-dynamic-menu .dropdown-menu .dropdown-item').last())
          } while (forWidthCont < btnsContainer.width())
        }
      }
    });

    // VSTAVKA REKLAM PLITKA*****************

    /*if ($('div.row').hasClass('dynamic-arts')) {
      if (reclamaBlock.children().first().height() < 600) {
        var temp = reclamaBlock.detach()
        temp.insertBefore($('.articles .row .col .col-md-6:nth-child(3)'))
        $('.articles .row .col .col-md-6').attr("class", "col-md-4")
      }
    }*/
    //****************************
  }

  if (mW < 900) {
    movArtbl.attr('class', 'col-sm-4')
  }
  if (mW < 767) {
    carouselControlPrev.detach()
    carouselControlPrev2.detach()
    carouselIndicators.detach()
    slsl.attr({
      'class': '',
      'data-ride': ''
    })
    /*
    $('#slsl .carousel-inner').slick({
      dots: false,
      infinite: true,
      speed: 300,
      arrows: false,
      responsive: [

        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            initialSlide: 1,
            centerPadding: '10px'
          }
        }
      ]
    });
    
    mobSliderNews.slick({
      dots: false,
      infinite: false,
      speed: 300,
      arrows: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            initialSlide: 0,
            centerPadding: '10px'
          }
        }
      ]
    });
    */
  }

  $(".file-upload input[type=file]").change(function () {
    var filename = $(this).val().replace(/.*\\/, "");
    $("#filename").val(filename);
  });

  $(".plus-news-bl, .for-anchor").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
});