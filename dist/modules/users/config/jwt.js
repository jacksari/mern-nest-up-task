"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function assignJwtToken(uid, jwtService) {
    return jwtService.sign({
        uid: uid,
    });
}
exports.default = assignJwtToken;
//# sourceMappingURL=jwt.js.map