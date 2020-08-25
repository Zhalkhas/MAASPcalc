require('popper.js');
require('bootstrap');
window.jQuery = window.$ = require("jquery");
let variables = {
    "1": [
        ["D<sub>TVD,SH,B</sub>", "m"],
        ["&#8711S<sub>FS,B</sub>", "kPa/m"],
        ["&#8711P<sub>MG,B</sub>", "kPa/m"]
    ],
    "2": [
        ["P<sub>PC,A</sub>", "kPa/m"],
        ["D<sub>TVD,TOC</sub>", "m"],
        ["&#8711P<sub>MG,B</sub>", "kPa/m"],
        ["M<sub>W,a</sub>", "kPa/m"]
    ],
    "3": [
        ["P<sub>PC,B</sub>", "kPa/m"],
        ["D<sub>TVD,SH</sub>", "m"],
        ["&#8711P<sub>MG,B</sub>", "kPa/m"],
        ["&#8711P<sub>BF,C</sub>", "kPa/m"]
    ]
}

function calculate() {
    let point = $("#point-selector").val()
    let res = 0
    let vals = retrieveVals();
    switch (point) {
        case "1":
            res = vals[0] * (vals[1] - vals[2]);
            break;
        case "2":
            res = 0.75 * vals[0] - (vals[1] * (vals[2] - vals[3]));
            break;
        case "3":
            res = 0.75 * vals[0] - (vals[1] * (vals[2] - vals[3]));
            break;
    }
    $("#pmaasp").text(Number.isNaN(res) ? 0 : Number(res.toFixed(2)));
}

$(document).ready(function() {

    $("#point-selector").html(
        '<select id="point-selector" class="custom-select">\
        <option value="1">1</option>\
        <option value="2">2</option>\
        <option value="3">3</option>');
    setValuesTable(variables["1"]);

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
        setValuesTable(variables[selected]);
        convcase = 0;
    })
    setValuesTable(variables["1"]);
})