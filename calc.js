window.jQuery = window.$ = require("jquery");
let convcase = 0; // 0 - kPa, 1 - psi, 2 - bar

function setValuesTable(values) {
    $("#valstable").html("");
    s = ""
    values.forEach(function(val, i) {
        s += "<tr><td class='p-2'>" + val[0] + "</td>" +
            "<td class='form-inline'>" +
            "<input class='p-1' type='number' value=0 id=" + i + "></input>" +
            "<span class='p-2' id=" + i + "_m>" + val[1] + "</span></td></tr>"
    })
    s += "<tr><td class='p-2'>P<sub>MAASP</sub></td>" +
        '<td class="form-inline">' +
        '<span type="number" id="pmaasp">0</span>' +
        '<span class="p-2" id="pmaasp_m">kPa/m</span>' +
        "</td></tr>"
    $("#valstable").html(s);
}


function retrieveVals() {
    let res = [];
    let count = 0;
    let inp;
    do {
        inp = $("#" + count).val();
        if (inp) {
            res.push(Number(inp));
            count++;
        }
    } while (inp);
    return res
}


function convert() {
    let unit, num, i = 0;
    let mult1 = 0;
    let mult2 = 0
    unit = $("#" + i + "_m").text();
    switch (convcase) {
        case 0:
            mult1 = 0.145038 / 3.2808;
            mult2 = 3.2808;
            convcase = 1;
            break;
        case 1:
            mult1 = 0.068947 / 0.3048;
            mult2 = 0.3048;
            convcase = 2;
            break;
        case 2:
            mult1 = 100;
            mult2 = 1;
            convcase = 0;
            break;
    }
    while (unit) {
        let value = $("#" + i).val();
        switch (unit) {
            case "kPa/m":
                num = Number((value * mult1).toFixed(2));
                $("#" + i).val(num == NaN ? 0 : num);
                $("#" + i + "_m").text("psi/ft");
                break;
            case "psi/ft":
                num = Number((value * mult1).toFixed(2));
                $("#" + i).val(num == NaN ? 0 : num);
                $("#" + i + "_m").text("bar/m");
                break;
            case "bar/m":
                num = Number((value * mult1).toFixed(2));
                $("#" + i).val(num == NaN ? 0 : num);
                $("#" + i + "_m").text("kPa/m")
                break;
            case "m":
                num = Number((value * mult2).toFixed(2));
                $("#" + i).val(num == NaN ? 0 : num);
                $("#" + i + "_m").text(convcase == 0 ? "m" : "ft");
                break;
            case "ft":
                num = Number((value * mult2).toFixed(2));
                $("#" + i).val(num == NaN ? 0 : num);
                $("#" + i + "_m").text("m");
                break;
        }
        i++;
        unit = $("#" + i + "_m").text();
    }
    unit = $("#pmaasp_m").text();
    maasp = $("#pmaasp");
    value = Number(maasp.text());
    switch (unit) {
        case "bar/m":
            res = Number((value * mult1).toFixed(2));
            maasp.text(Number.isNaN(res) ? 0 : res);
            $("#pmaasp_m").text("kPa/m");
            break;
        case "kPa/m":
            res = Number((value * mult1).toFixed(2));
            maasp.text(Number.isNaN(res) ? 0 : res);
            $("#pmaasp_m").text("psi/ft");
            break;
        case "psi/ft":
            res = Number((value * mult1).toFixed(2));
            maasp.text(Number.isNaN(res) ? 0 : res);
            $("#pmaasp_m").text("bar/m");
            break;
    }
}


function main_menu() {
    window.history.back();
}