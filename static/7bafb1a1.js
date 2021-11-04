blocksFor_7bafb1a1 = [

    {
        runExternalJs: function() {
        
        },
        getIframeString: function() {
            return '<iframe src="https://orbit4.lun.ua/html/pravda.com.ua.html?temp=7bafb1a1' + bkUrlVarsFor_7bafb1a1 + '" width="100%" height="270" align="center" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" style="display:block;"></iframe>';
        },
    }
];
bkBlockToLoadFor_7bafb1a1 = 0;
    blocksFor_7bafb1a1[bkBlockToLoadFor_7bafb1a1].runExternalJs();
    bk_vars = ['region', 'city', 'microdistrict', 'district', 'street', 'house', 'room_count', 'area_total_min', 'area_total_max', 'price_min', 'price_max', 'price_sqm_min', 'price_sqm_max', 'currency', 'state', 'building_id'];
    bkUrlVarsFor_7bafb1a1 = '';
    for (var i in bk_vars) {
        var varname = 'bk_' + bk_vars[i];
        if (typeof window[varname] !== "undefined" && window[varname]) {
            if (typeof window[varname] == "object") {
                for (var j in window[varname]) {
                    if (window[varname][j] && (typeof window[varname][j] == "string" || typeof window[varname][j] == "number")) {
                        bkUrlVarsFor_7bafb1a1 += '&' + bk_vars[i] + '=' + encodeURIComponent(window[varname][j]);
                    }
                }
            } else if (typeof window[varname] == "string" || typeof window[varname] == "number") {
                bkUrlVarsFor_7bafb1a1 += '&' + bk_vars[i] + '=' + encodeURIComponent(window[varname]);
            }
        }
    }
    bkUrlVarsFor_7bafb1a1 += '&random=1';
document.write(blocksFor_7bafb1a1[bkBlockToLoadFor_7bafb1a1].getIframeString());
