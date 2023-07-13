"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
function checkProxy(proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get('https://api.ipify.org?format=json', {
                proxy: {
                    host: proxy.ip,
                    port: proxy.port,
                    protocol: "http"
                }
            });
            if (response.data.ip) {
                console.log(`${chalk_1.default.green(" Validated")}`);
                fs_1.default.appendFileSync('valid.txt', `${proxy.ip}:${proxy.port}\n`);
            }
            else {
                console.log(`${chalk_1.default.red("Invalid")}`);
            }
        }
        catch (error) {
            fs_1.default.appendFileSync('invalid.txt', `${proxy.ip}:${proxy.port}\n`);
            console.log(`HTTP Protokollu Proxy Degil`);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    let { data } = yield axios_1.default.get("https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.json");
    let httpProxies = data;
    httpProxies.forEach(checkProxy);
}))();
