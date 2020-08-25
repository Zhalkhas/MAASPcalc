// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
require('popper.js');
require('bootstrap');
window.jQuery = window.$ = require("jquery")
const electron = require("electron")

$('#btnA').click(function() {
    console.log("btn A")
    let localWindow = electron.remote.getCurrentWindow();
    localWindow.loadFile("html/A-anus.html");
})

$('#btnB').click(function() {
    console.log("btn B")
    let localWindow = electron.remote.getCurrentWindow();
    localWindow.loadFile("html/B-anus.html");
})

$('#btnC').click(function() {
    console.log("btn A")
    let localWindow = electron.remote.getCurrentWindow();
    localWindow.loadFile("html/C-anus.html");
})