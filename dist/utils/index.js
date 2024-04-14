"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = exports.generateApiKey = exports.guid = exports.ApiConstants = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
exports.ApiConstants = {
    ApiBaseUrl: '/api/v1',
    ApiKey: '123456',
};
const guid = () => {
    return (0, uuid_1.v4)();
};
exports.guid = guid;
const generateApiKey = async () => {
    var rawGuid = (0, exports.generateId)(45);
    var apiKey = await bcrypt_1.default.hash(rawGuid, saltRounds);
    return apiKey
        .toString()
        .replaceAll('.', '')
        .replaceAll('$', 'Kc')
        .replaceAll('/', '');
};
exports.generateApiKey = generateApiKey;
const generateId = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateId = generateId;
//# sourceMappingURL=index.js.map