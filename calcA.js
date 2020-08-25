require('popper.js');
require('bootstrap');
require('../calc.js');
window.jQuery = window.$ = require("jquery");

let calccase = $("#case").text();
let variables = {
    case1: {
        "1": [
            ["P<sub>PC,SV</sub>", "kPa/m"],
            ["D<sub>TVD,SV</sub>", "m"],
            ["M<sub>W,A</sub>", "ppg"],
            ["M<sub>W,TBG</sub>", "ppg"]
        ],
        "2": [
            ["P<sub>PC,ACC</sub>", "kPa/m"],
            ["D<sub>TVD,ACC</sub>", "m"],
            ["M<sub>W,A</sub>", "ppg"],
            ["M<sub>W,TBG</sub>", "ppg"]
        ],
        "3": [
            ["P<sub>PC,ACC</sub>", "kPa/m"],
            ["D<sub>TVD,PP</sub>", "m"],
            ["M<sub>W,A</sub>", "ppg"],
            ["M<sub>W,TBG</sub>", "ppg"]
        ],
        "5": [
            ["P<sub>PC,TBG</sub>", "kPa/m"],
            ["D<sub>TVD,PP</sub>", "m"],
            ["M<sub>W,A</sub>", "ppg"],
            ["M<sub>W,TBG</sub>", "ppg"]
        ],
        "7A": [
            ["P<sub>PB,B</sub>", "kPa/m"],
            ["D<sub>TVD,LH</sub>", "m"],
            ["M<sub>W,A</sub>", "ppg"],
            ["&#8711P<sub>BF,B</sub>", "kPa/m"]
        ],
    },
    case2: {
        "1": [
            ["P<sub>PC,SV</sub>", "kPa/m"],
            ["D<sub>TVD,SV</sub>", "m"],
            ["M<sub>W,A</sub>", "ppg"],
            ["M<sub>W,TBG</sub>", "ppg"]
        ],
        "2": [
            ["P<sub>PC,ACC</sub>", "kPa/m"],
            ["D<sub>TVD,ACC</sub>", "m"],
            ["M<sub>W,A</sub>", "ppg"],
            ["M<sub>W,TBG</sub>", "ppg"]
        ],
        "3": [
            ["P<sub>PC,ACC</sub>", "kPa/m"],
            ["D<sub>TVD,PP</sub>", "m"],
            ["M<sub>W,A</sub>", "ppg"],
            ["M<sub>W,TBG</sub>", "ppg"]
        ],
        "4": [
            ["P<sub>PB,LH</sub>", "kPa/m"],
            ["D<sub>TVD,LH</sub>", "m"],
            ["M<sub>W,A</sub>", "ppg"],
            ["&#8711P<sub>BF,B</sub>", "kPa/m"]
        ],
        "5": [
            ["P<sub>PC,TBG</sub>", "kPa/m"],
            ["D<sub>TVD,PP</sub>", "m"],
            ["M<sub>W,A</sub>", "ppg"],
            ["M<sub>W,TBG</sub>", "ppg"]
        ],
        "6": [
            ["D<sub>TVD,SH</sub>", "m"],
            ["&#8711S<sub>FS,A</sub>", "kPa/m"],
            ["M<sub>W,A</sub>", "ppg"],
        ],
        "7A": [
            ["P<sub>PB,B</sub>", "kPa/m"],
            ["D<sub>TVD,PP</sub>", "m"],
            ["M<sub>W,A</sub>", "ppg"],
            ["&#8711P<sub>BF,B</sub>", "kPa/m"]
        ],
        "7B": [
            ["P<sub>PB,B</sub>", "kPa/m"],
            ["D<sub>TVD,PP</sub>", "m"],
            ["M<sub>W,A</sub>", "ppg"],
            ["&#8711P<sub>BF,B</sub>", "kPa/m"]
        ],

    }
}

function calculate() {
    let point = $("#point-selector").val()
    let res = 0
    let vals = retrieveVals();
    let mult = 1;
    switch (convcase) {
        case 0:
            mult = 1.176;
            break;
        case 1:
            mult = 0.052;
            break;
        case 2:
            mult = 0.012;
            break;
    }
    switch (point) {
        case "1":
            vals[2] = mult * vals[2];
            vals[3] = mult * vals[3];
            res = 0.75 * vals[0] - (vals[1] * (vals[2] - vals[3]));
            break;
        case "2":
            vals[2] = mult * vals[2];
            vals[3] = mult * vals[3];
            res = 0.75 * vals[0] - (vals[1] * (vals[2] - vals[3]));
            break;
        case "3":
            vals[2] = mult * vals[2];
            vals[3] = mult * vals[3];
            res = 0.75 * vals[0] - (vals[1] * (vals[2] - vals[3]));
            break;
        case "4":
            if (calccase == "2") {
                vals[2] = mult * vals[2];
                res = 0.5 * vals[0] - (vals[1] * (vals[2] - vals[3]));
            }
            break;
        case "5":
            vals[2] = mult * vals[2];
            vals[3] = mult * vals[3];
            res = 0.75 * vals[0] - (vals[1] * (vals[2] - vals[3]));
            break;
        case "6":
            if (calccase == "2") {
                vals[2] = mult * vals[2];
                res = (vals[0] * (vals[1] - vals[2]));
            }
            break;
        case "7A":
            vals[2] = mult * vals[2];
            res = 0.5 * vals[0] - (vals[1] * (vals[2] - vals[3]));
            break;
        case "7B":
            if (calccase == "2") {
                vals[2] = mult * vals[2];
                res = 0.5 * vals[0] - (vals[1] * (vals[2] - vals[3]));
            }
            break;
    }
    $("#pmaasp").text(Number.isNaN(res) ? 0 : Number(res.toFixed(2)));
}

$(document).ready(function() {
    $("#case1").click(function() {
        $("#case").text(1);
        calccase = 1;
        $("#point-selector").html(
            '<select id="point-selector" class="custom-select">\
            <option value="1">1</option>\
            <option value="2">2</option>\
            <option value="3">3</option>\
            <option value="5">5</option>\
            <option value="7A">7A</option>')
        setValuesTable(variables["case1"]["1"]);
        convcase = 0;
    })

    $("#case2").click(function() {
        $("#case").text(2);
        calccase = 2;
        $("#point-selector").html(
            '<select id="point-selector" class="custom-select">\
            <option value="1">1</option>\
            <option value="2">2</option>\
            <option value="3">3</option>\
            <option value="4">4</option>\
            <option value="5">5</option>\
            <option value="6">6</option>\
            <option value="7A">7A</option>\
            <option value="7B">7B</option>')
        setValuesTable(variables["case1"]["1"]);
        convcase = 0;
    })
    $("#calc").click(function() {
        calculate();
    })
    $("#conv").click(function() {
        convert();
    })
    $("#main-menu").click(function() {
        main_menu();
    })
    $("#point-selector").change(function() {
        let selected = $("#point-selector option:selected").val();
        setValuesTable(variables["case" + calccase][selected]);
        convcase = 0;
    })
    setValuesTable(variables["case1"]["1"]);
})