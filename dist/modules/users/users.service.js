"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const helpers_auth_1 = require("./helpers.auth");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("./config/jwt");
const jwt_2 = require("@nestjs/jwt");
const uid_1 = require("uid");
let UsersService = class UsersService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    findAll() {
        return this.usersRepository.find({
            select: [
                'id',
                'email',
                'firstName',
                'lastName',
                'created_at',
                'updated_at',
            ],
        });
    }
    findOne(id) {
        return this.usersRepository.findOne({
            where: { id },
            select: [
                'id',
                'uid',
                'email',
                'firstName',
                'lastName',
                'created_at',
                'updated_at',
            ],
        });
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
    async create(createUserDto) {
        const userExist = await this.usersRepository.findOne({
            where: { email: createUserDto.email.toLowerCase().trim() },
        });
        if (userExist) {
            return new common_1.NotFoundException({
                ok: false,
                message: 'El usuario con ese email ya existe',
            });
        }
        return this.usersRepository.save(Object.assign(Object.assign({}, createUserDto), { email: createUserDto.email.toLowerCase().trim(), uid: (0, uid_1.uid)(32), password: await (0, helpers_auth_1.hashPassword)(createUserDto.password) }));
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        try {
            const user = await this.usersRepository.findOne({
                where: { email },
                select: ['id', 'email', 'password'],
            });
            if (!user) {
                return new common_1.UnauthorizedException({
                    ok: false,
                    message: 'El usuario no existe en la base de datos',
                });
            }
            const isPasswordMatched = (0, bcrypt_1.compareSync)(password, user.password);
            if (!isPasswordMatched) {
                return new common_1.UnauthorizedException({
                    ok: false,
                    message: 'Credenciales incorrectas',
                });
            }
            return await (0, jwt_1.default)(user.uid, this.jwtService);
        }
        catch (error) {
            console.log({ error });
        }
    }
    async checkAuthStatus(uid) {
        const token = await (0, jwt_1.default)(uid, this.jwtService);
        const user = await this.usersRepository.findOne({
            where: { uid },
            select: [
                'id',
                'uid',
                'email',
                'firstName',
                'lastName',
                'created_at',
                'updated_at',
            ],
        });
        return {
            user,
            token,
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_2.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map