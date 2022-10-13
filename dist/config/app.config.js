"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = require("./database.config");
exports.default = () => ({
    environment: process.env.NODE_ENVIRONMENT
        ? process.env.NODE_ENVIRONMENT
        : 'development',
    port: 5000,
    database: Object.assign({}, (0, database_config_1.default)()),
});
//# sourceMappingURL=app.config.js.map