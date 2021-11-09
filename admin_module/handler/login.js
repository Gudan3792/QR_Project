"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chkSession = exports.login = void 0;
var admin_info_1 = __importDefault(require("./login/admin_info"));
var var_box_1 = require("../var_box");
var chkInfo = function (userName, password) {
    return (admin_info_1.default.AdminName == userName && admin_info_1.default.AdminPassword == password);
};
var login = function (req, res) {
    console.log(req.body);
    var userName = req.body.userName;
    var password = req.body.password;
    if (!chkInfo(userName, password)) {
        res.status(400).send("로그인 실패");
        return;
    }
    res.cookie("session", admin_info_1.default.SessionKey, {
        maxAge: 10000,
        path: "/"
    });
    res.redirect(302, (0, var_box_1.getAdminStatic)());
};
exports.login = login;
var chkSession = function (req, res) {
    if (req.cookies == undefined) {
        res.status(400).send("no cookies");
        return;
    }
    if (admin_info_1.default.SessionKey != req.cookies.session) {
        res.status(400).send("not match session");
        return;
    }
    res.status(200).send("ok");
};
exports.chkSession = chkSession;
