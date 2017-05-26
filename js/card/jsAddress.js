var WEB_ROOT_HOST="http://weixpay.yi-ming.cn";
//下拉列表绑定数据
function InitSelectCity(province, city, area) {
    var provinceId = $(province).attr("data-id");
    var cityId = $(city).attr("data-id");
    var areaId = $(area).attr("data-id");
    $.ajax({
        type: "post",
        async: true,
        url: WEB_ROOT_HOST + "/Common/GetProvinces",
        dataType: "jsonp",
        success: function (result) {
		console.log(result);
            $(result).each(function (i, n) {
                if (provinceId == n.Id) {
                    $(city).show();
                    $(province).append("<option selected value='" + n.Id + "'>" + n.Name + "</option>");
                    LoadCity(province, city, area);
                }
                else {
                    $(province).append("<option  value='" + n.Id + "'>" + n.Name + "</option>");
                }
            });
        }
    });

    $(province).bind("change", function () {
        $(province).attr("data-id", "0");
        $(city).attr("data-id", "0");
        $(area).attr("data-id", "0");
        LoadCity(province, city, area)
        $(area).hide();
    });

    $(city).bind("change", function () {
        $(province).attr("data-id", "0");
        $(city).attr("data-id", "0");
        $(area).attr("data-id", "0");
        LoadArea(city, area)
    });
}
function LoadCity(province, city, area) {
    $(city).empty();
    $(area).empty();
    $(area).show();
    var provinceId = $(province).attr("data-id");
    var cityId = $(city).attr("data-id");
    var parentId = "";
    if (provinceId != null && provinceId != undefined && provinceId != "undefined" && provinceId != "" && parseInt(provinceId)!=0)
    {
        parentId = provinceId;
    }
    else {
        parentId = $(province).val();
    }
    $.ajax({
        type: "post",
        async: true,
        url: WEB_ROOT_HOST + "/Common/GetCities",
        data: { "provinceId": parentId },
        dataType: "jsonp",
        success: function (result) {
            result = $.merge([{ Id: '0', Name: '请选择城市' }], result);
            $(result).each(function (i, n) {
                if (cityId == n.Id) {
                    $(city).append("<option selected value='" + n.Id + "'>" + n.Name + "</option>");
                    LoadArea(city, area);
                }
                else {
                    $(city).append("<option  value='" + n.Id + "'>" + n.Name + "</option>");
                }
            });
            $(city).show();
        }
    });
}
function LoadArea(city, area) {
    var cityId = $(city).attr("data-id");
    var areaId = $(area).attr("data-id");
    $(area).empty();
    var parentId = "";
    if (cityId != null && cityId != undefined && cityId != "undefined" && cityId != "" && parseInt(cityId) != 0) {
        parentId = cityId;
    }
    else {
        parentId = $(city).val();
        if(parentId!="0")
        {
            $(area).show();
        }
    }
    
    $.ajax({
        type: "post",
        async: true,
        url: WEB_ROOT_HOST + "/Common/GetAreas",
        data: { "cityId": parentId },
        dataType: "jsonp",
        success: function (result) {
            result = $.merge([{ Id: '0', Name: '请选择区/县' }], result);
            $(result).each(function (i, n) {
                if (areaId == n.Id) {
                    $(area).append("<option selected value='" + n.Id + "'>" + n.Name + "</option>");
                }
                else {
                    $(area).append("<option  value='" + n.Id + "'>" + n.Name + "</option>");
                }
            });
        }
    });
}