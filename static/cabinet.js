document.addEventListener("DOMContentLoaded", function () {
  var url_p = document.querySelector('[content="177855928894402"]');
  var url_l = document.querySelector('[content="592361947628060"]');
  var url_e = document.querySelector('[content="166620513397294"]');
  var url_t = document.querySelector('[content="1305235669535071"]');
  var url_ep = document.querySelector('[content="552500884859152"]');

  if (
    url_p !== null ||
    url_l !== null ||
    url_e !== null ||
    url_t !== null ||
    url_ep !== null
  ) {
    var type = null;
    if (url_p !== null) {
      type = "pravda";
      // создан ие банера в указанном месте
    }
    if (url_l !== null) {
      type = "live";
      // создан ие банера в указанном месте
    }
    if (url_e !== null) {
      type = "ekonom";
      // создан ие банера в указанном месте
    }
    if (url_t !== null) {
      type = "tabloid";
      // создан ие банера в указанном месте
    }
    if (url_ep !== null) {
      type = "epravda";
      // создан ие банера в указанном месте
    }

    var userInf = localStorage.getItem("userInf");
    if (userInf != null) {
      var base64Url = userInf.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      userInf = JSON.parse(jsonPayload);
      // userInf = JSON.parse(userInf);
      userInf.expire = new Date(userInf.expire);

      var MyFavoritesLinks = localStorage.getItem("MyFavoritesLinks");
      if (MyFavoritesLinks != null) {
        MyFavoritesLinks = JSON.parse(MyFavoritesLinks);
      } else {
        MyFavoritesLinks = [];
      }
      MyFavoritesLinks = MyFavoritesLinks.concat(userInf.favorite);

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      var unique = MyFavoritesLinks.filter(onlyUnique);

      localStorage.setItem("MyFavoritesLinks", JSON.stringify(unique));
    }

    cabinet_event(userInf, type);
  }
});

function cabinet_event(user_inf, type) {
  var MyFavoritesLinks = localStorage.getItem("MyFavoritesLinks");

  if (MyFavoritesLinks != null) {
    MyFavoritesLinks = JSON.parse(MyFavoritesLinks);
  } else {
    MyFavoritesLinks = [];
  }

  //модальное окно
  var css =
    "<style>.modal{display:none;position:fixed;z-index:1;background-color:#000;background-color:rgba(0,0,0,.5);align-items:center;justify-content:center;z-index:9999;right:0;bottom:0;left:0;top:0;transition:all .8s linear}.modal-content{background-color:#fefefe;margin:auto;padding:20px;border:1px solid #888;max-width:320px;max-height:100vh;overflow-x:hidden;overflow-y:auto;transition:all .4s linear;flex:0 1 100%;font-family:'Fira Sans',sans-serif}.close{color:#aaa;float:right;font-size:28px;font-weight:700;display:block;height:20px;width:20px;margin:-4px -4px 0 0;cursor:pointer}.close:focus,.close:hover{color:#000;text-decoration:none;cursor:pointer}.icon .icon-bar{display:block;width:18px;height:2px;background-color:#2e2e2e;position:relative;top:10px;right:-2px}.icon>.icon-bar{-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg);margin-top:-2px}.icon>.icon-bar+.icon-bar{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}.button_link{width:100%;display:inline-block;vertical-align:middle;padding:14px;border:1px solid transparent;border-radius:0;font-size:16px;font-weight:700;text-transform:uppercase;line-height:1;text-align:center;cursor:pointer;background-color:#fff;color:#900022;box-shadow:0 3px 13px 0 rgba(17,17,17,.1);border-radius:30px;margin:10px 0 20px 0;font-family:'Fira Sans',sans-serif}.button_auth{width:100%;display:inline-block;vertical-align:middle;padding:14px;border:1px solid transparent;border-radius:0;font-size:16px;font-weight:700;text-transform:uppercase;line-height:1;text-align:center;cursor:pointer;background-color:#7e0019;color:#fff;box-shadow:0 3px 13px 0 rgba(17,17,17,.1);border-radius:30px;margin:0 0 20px 0;font-family:'Fira Sans',sans-serif}.button_auth:hover,.button_link:hover{opacity:.86}.modal-content p {margin: 1em 0;} #add_fo_favorite{cursor: pointer;}</style>";

  var html =
    '<div id="myModal" class="modal"> <div class="modal-content"> <a class="close icon"> <span class="icon-bar"></span> <span class="icon-bar"></span> </a> <p><b>Функція збереження статей доступна лише для членів Клубу УП</b></p><a href="http://club.pravda.com.ua"><button class="button_link">Дізнатися більше про Клуб</button></a> <a href="https://cabinet.pravda.com.ua/check"><button class="button_auth">Авторизуватись</button></a> </div></div>';

  var now = new Date();

  /*
  // отключение рекламы
  if (user_inf != null && user_inf.ads == true) {
    var banners = document.getElementById("adriver_banner_1706769137");
    if (banners != null) {
      banners.remove();
    }

    var banners = document.getElementById("smplCatfish");
    if (banners != null) {
      banners.remove();
    }

    var banners = document.getElementById("adriver_banner_607207850");
    if (banners != null) {
      banners.remove();
    }

    var banners = document.getElementById(
      "admixer_83bba78637ac45ceb53fcb9eef47c9e4_zone_21336_sect_6432_site_380"
    );
    if (banners != null) {
      banners.remove();
    }

    var banners = document.getElementById(
      "admixer_88059809eb384b56a922ebddfd5d0b97_zone_7891_sect_380_site_380"
    );
    if (banners != null) {
      banners.remove();
    }

    var banners = document.getElementById("article_300_banner_for_mobile");
    if (banners != null) {
      banners.remove();
    }

    var banners = document.getElementById("adriver_banner_802021744");
    if (banners != null) {
      banners.remove();
    }

    var banners = document.getElementsByClassName("container_sub_adv_news");
    Array.prototype.forEach.call(banners, function (el) {
      el.remove();
    });

    var banners = document.getElementsByClassName("unit_news_banner_bottom");
    Array.prototype.forEach.call(banners, function (el) {
      el.remove();
    });

    var banners = document.getElementsByClassName("unit_side_banner");
    Array.prototype.forEach.call(banners, function (el) {
      el.remove();
    });

    var banners = document.getElementsByClassName("block_banner_1x");
    Array.prototype.forEach.call(banners, function (el) {
      el.remove();
    });
  }
  */

  // Укр правда
  //-----------------------------------------------
  ukr_pravda = document.querySelector(".post_social_top");
  if (ukr_pravda !== null && type == "pravda") {
    // добовляем кнопку добавить в избранное
    ukr_pravda.insertAdjacentHTML(
      "beforeend",
      '<a class="post_social_item" id="add_fo_favorite" ><img src="https://cabinet.pravda.com.ua/images/ico_d_bookmark.svg" alt="Додати у вибране"></a>'
    );

    if (user_inf == null || user_inf.expire < now) {
      document.querySelector("head").insertAdjacentHTML("beforeend", css);
      document.querySelector("body").insertAdjacentHTML("beforeend", html);

      var modal = document.getElementById("myModal");
      var btn = document.getElementById("add_fo_favorite");
      var span = document.getElementsByClassName("close")[0];
      btn.onclick = function () {
        modal.style.display = "flex";
      };
      span.onclick = function () {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    } else {
      if (MyFavoritesLinks.indexOf(location.href) != -1) {
        document.querySelector("#add_fo_favorite img").src =
          "https://cabinet.pravda.com.ua/images/ico_bookmark.svg";
      } else {
        // добавляени в избранное
        document
          .getElementById("add_fo_favorite")
          .addEventListener("click", function () {
            document.querySelector("#add_fo_favorite img").src =
              "https://cabinet.pravda.com.ua/images/ico_bookmark.svg";
            add_to_favorite();
            MyFavoritesLinks.push(location.href);
            localStorage.setItem(
              "MyFavoritesLinks",
              JSON.stringify(MyFavoritesLinks)
            );
          });
      }
    }
  }
  //-----------------------------------------------

  // Жизнь
  //-----------------------------------------------
  life = document.querySelector(".comment-bottom-block");
  if (life !== null && type == "live") {
    // добовляем кнопку добавить в избранное
    life.insertAdjacentHTML(
      "afterend",
      '<div class="comment-bottom-block" id="add_fo_favorite" style="cursor:pointer;"><a><img src="https://cabinet.pravda.com.ua/images/ico_bookmark_life.svg" alt="В закладки"></a></div>'
    );

    if (user_inf == null || user_inf.expire < now) {
      document.querySelector("head").insertAdjacentHTML("beforeend", css);
      document.querySelector("body").insertAdjacentHTML("beforeend", html);

      var modal = document.getElementById("myModal");
      var btn = document.getElementById("add_fo_favorite");
      var span = document.getElementsByClassName("close")[0];
      btn.onclick = function () {
        modal.style.display = "flex";
      };
      span.onclick = function () {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    } else {
      if (MyFavoritesLinks.indexOf(location.href) != -1) {
        document.querySelector("#add_fo_favorite img").src =
          "https://cabinet.pravda.com.ua/images/ico_bookmark_life_a.svg";
      } else {
        // добавляени в избранное
        document
          .getElementById("add_fo_favorite")
          .addEventListener("click", function () {
            document.querySelector("#add_fo_favorite img").src =
              "https://cabinet.pravda.com.ua/images/ico_bookmark_life_a.svg";
            add_to_favorite();
            MyFavoritesLinks.push(location.href);
            localStorage.setItem(
              "MyFavoritesLinks",
              JSON.stringify(MyFavoritesLinks)
            );
          });
      }
    }
  }
  //-----------------------------------------------

  // Экономика
  //-----------------------------------------------
  ecomon = document.querySelector(".post__social tr");
  if (ecomon !== null && type == "ekonom") {
    // добовляем кнопку добавить в избранное
    ecomon.insertAdjacentHTML(
      "beforeend",
      '<td style="padding: 0 0 0 15px;"><div id="add_fo_favorite" style="border-radius: 3px; background-color: rgb(74, 93, 50); height: 19px; padding: 1px 12px 2px 8px; display: inline-block;cursor:pointer;"><a><img src="https://cabinet.pravda.com.ua/images/ico_bookmark_e.svg" alt="В закладки"><span style="font-size: 10px; color: #fff; position: relative; top: -3px;">В закладки</span></a></div></td>'
    );

    if (user_inf == null || user_inf.expire < now) {
      document.querySelector("head").insertAdjacentHTML("beforeend", css);
      document.querySelector("body").insertAdjacentHTML("beforeend", html);

      var modal = document.getElementById("myModal");
      var btn = document.getElementById("add_fo_favorite");
      var span = document.getElementsByClassName("close")[0];
      btn.onclick = function () {
        modal.style.display = "flex";
      };
      span.onclick = function () {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    } else {
      if (MyFavoritesLinks.indexOf(location.href) != -1) {
        document.querySelector("#add_fo_favorite img").src =
          "https://cabinet.pravda.com.ua/images/ico_bookmark_e_a.svg";
      } else {
        // добавляени в избранное
        document
          .getElementById("add_fo_favorite")
          .addEventListener("click", function () {
            document.querySelector("#add_fo_favorite img").src =
              "https://cabinet.pravda.com.ua/images/ico_bookmark_e_a.svg";
            add_to_favorite();
            MyFavoritesLinks.push(location.href);
            localStorage.setItem(
              "MyFavoritesLinks",
              JSON.stringify(MyFavoritesLinks)
            );
          });
      }
    }
  }
  //-----------------------------------------------

  // Таблоид
  //-----------------------------------------------
  tabloid = document.querySelector(".post__social");
  if (tabloid !== null && type == "tabloid") {
    // добовляем кнопку добавить в избранное
    tabloid.insertAdjacentHTML(
      "beforeend",
      '<a class="post__social__item" id="add_fo_favorite"><img src="https://cabinet.pravda.com.ua/images/ico_bookmark_t.svg" alt="Додати у вибране" width="40" height="40"></a>'
    );

    if (user_inf == null || user_inf.expire < now) {
      document.querySelector("head").insertAdjacentHTML("beforeend", css);
      document.querySelector("body").insertAdjacentHTML("beforeend", html);

      var modal = document.getElementById("myModal");
      var btn = document.getElementById("add_fo_favorite");
      var span = document.getElementsByClassName("close")[0];
      btn.onclick = function () {
        modal.style.display = "flex";
      };
      span.onclick = function () {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    } else {
      if (MyFavoritesLinks.indexOf(location.href) != -1) {
        document.querySelector("#add_fo_favorite img").src =
          "https://cabinet.pravda.com.ua/images/ico_bookmark_t_a.svg";
      } else {
        // добавляени в избранное
        document
          .getElementById("add_fo_favorite")
          .addEventListener("click", function () {
            document.querySelector("#add_fo_favorite img").src =
              "https://cabinet.pravda.com.ua/images/ico_bookmark_t_a.svg";
            add_to_favorite();
            MyFavoritesLinks.push(location.href);
            localStorage.setItem(
              "MyFavoritesLinks",
              JSON.stringify(MyFavoritesLinks)
            );
          });
      }
    }
  }
  //-----------------------------------------------

  // Европейская правда
  //-----------------------------------------------
  epravda = document.querySelector(".post__social_top");
  if (epravda !== null && type == "epravda") {
    // добовляем кнопку добавить в избранное
    epravda.insertAdjacentHTML(
      "beforeend",
      '<a class="post__social__item" id="add_fo_favorite" style="background: #e5edf4; padding: 0 10px 0 10px;cursor:pointer;"><img src="https://cabinet.pravda.com.ua/images/ico_bookmark_eu.svg" alt=""></a>'
    );

    if (user_inf == null || user_inf.expire < now) {
      document.querySelector("head").insertAdjacentHTML("beforeend", css);
      document.querySelector("body").insertAdjacentHTML("beforeend", html);

      var modal = document.getElementById("myModal");
      var btn = document.getElementById("add_fo_favorite");
      var span = document.getElementsByClassName("close")[0];
      btn.onclick = function () {
        modal.style.display = "flex";
      };
      span.onclick = function () {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    } else {
      if (MyFavoritesLinks.indexOf(location.href) != -1) {
        document.querySelector("#add_fo_favorite img").src =
          "https://cabinet.pravda.com.ua/images/ico_bookmark_eu_a.svg";
      } else {
        // добавляени в избранное
        document
          .getElementById("add_fo_favorite")
          .addEventListener("click", function () {
            document.querySelector("#add_fo_favorite img").src =
              "https://cabinet.pravda.com.ua/images/ico_bookmark_eu_a.svg";
            add_to_favorite();
            MyFavoritesLinks.push(location.href);
            localStorage.setItem(
              "MyFavoritesLinks",
              JSON.stringify(MyFavoritesLinks)
            );
          });
      }
    }
  }
  //-----------------------------------------------
}

function add_to_favorite() {
  try {
    var xhr = new XMLHttpRequest();
    var params = "event=add_fo_favorite&url="+location.href;
    xhr.open("POST", "https://cabinet.pravda.com.ua/api", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.withCredentials = true;
    xhr.send(params);
  } catch (err) {}
}

