"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandler = exports.deleteHandler = exports.selectHandler = void 0;
var var_box_1 = require("../var_box");
var select_1 = __importDefault(require("../table/select"));
var delete_1 = __importDefault(require("../table/delete"));
var insert_1 = __importDefault(require("../table/insert"));
var admin_info_1 = __importDefault(require("./login/admin_info"));
var selectHandler = function (req, res) {
    (0, select_1.default)((0, var_box_1.getConn)()).then(function (value) {
        res.status(200).send(JSON.stringify(value));
    })
        .catch(function (reason) {
        res.status(500).send(reason);
    });
};
exports.selectHandler = selectHandler;
var deleteHandler = function (req, res) {
    if (admin_info_1.default.SessionKey == req.cookies.session) {
        res.status(400).send("not match session");
        return;
    }
    var name = req.body.name;
    (0, delete_1.default)((0, var_box_1.getConn)(), name).then(function () {
        res.status(200).send("");
    })
        .catch(function (reason) {
        res.status(500).send(reason);
    });
};
exports.deleteHandler = deleteHandler;
var createHandler = function (req, res) {
    var _a;
    console.log(req.body);
    console.log(req.files);
    if (admin_info_1.default.SessionKey == req.cookies.session) {
        res.status(400).send("not match session");
        return;
    }
    var f = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
    var d = {
        name: req.body.name,
        price: req.body.price,
        image_type: f.mimetype,
        data: f.data
    };
    (0, insert_1.default)((0, var_box_1.getConn)(), d).then(function () {
        res.status(200).send("");
    })
        .catch(function (reason) {
        console.log("create item error =>" + reason);
        res.status(500).send(reason);
    });
};
exports.createHandler = createHandler;
