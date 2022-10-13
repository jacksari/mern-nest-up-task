"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const saltOrRounds = 10;
const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltOrRounds);
};
exports.hashPassword = hashPassword;
//# sourceMappingURL=helpers.auth.js.map