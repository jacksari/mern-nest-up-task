"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
        throw new common_1.UnauthorizedException({
            ok: false,
            message: 'No hay usuario logueado.',
        });
    }
    if (data) {
        return request.user[data];
    }
    return request.user;
});
//# sourceMappingURL=current-user.decorator.js.map