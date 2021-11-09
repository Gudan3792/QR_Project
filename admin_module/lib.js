"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiRouter = exports.initMethod = void 0;
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
var init = __importStar(require("./var_box"));
var handler_1 = __importDefault(require("./handler/handler"));
var l = /** @class */ (function () {
    function l() {
        var _this = this;
        this.list = { db: false, adminPage: false };
        this.initDB = function (host, port, userName, password, dbName) {
            init.initDB(host, port, userName, password, dbName).catch(function (reason) {
                throw reason;
            }).then(function () {
                _this.list.db = true;
            });
        };
        this.initAdminPagePath = function (path) {
            init.initAdminFolder(path);
            _this.list.adminPage = true;
        };
        this.createApiRouter = function () {
            if (_this.list.db == false && _this.list.adminPage == false)
                throw "not init this module";
            var router = express_1.default.Router();
            router.use(express_1.default.json());
            router.use(body_parser_1.default.urlencoded({ extended: false }));
            router.use((0, cookie_parser_1.default)());
            router.post("/login", handler_1.default.publicHandler.adminLogin);
            router.get("/chk_session", handler_1.default.publicHandler.sessionCheck);
            router.get("/get_menu", handler_1.default.publicHandler.getList);
            router.post("/delete_item", handler_1.default.privateHandler.delete);
            router.post("/create_item", handler_1.default.privateHandler.create);
            return router;
        };
    }
    return l;
}());
var api = new l();
exports.initMethod = {
    initDB: api.initDB,
    initAdminStaticPath: api.initAdminPagePath
};
exports.createApiRouter = api.createApiRouter;
