"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesWsService = void 0;
const common_1 = require("@nestjs/common");
let MessagesWsService = class MessagesWsService {
    constructor() {
        this.connectedClients = {};
    }
    registerClient(client) {
        this.connectedClients[client.id] = client;
    }
    removeClient(clientId) {
        delete this.connectedClients[clientId];
    }
    getConnectedClients() {
        return Object.keys(this.connectedClients).length;
    }
};
MessagesWsService = __decorate([
    (0, common_1.Injectable)()
], MessagesWsService);
exports.MessagesWsService = MessagesWsService;
//# sourceMappingURL=messages-ws.service.js.map