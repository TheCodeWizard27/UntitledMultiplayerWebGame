"use strict";

const Client = require("../../src/client/Client.js");

window.addEventListener("load", () => { Client.getInstance().init(); });