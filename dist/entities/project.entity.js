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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.statusProject = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var statusProject;
(function (statusProject) {
    statusProject["PENDIENTE"] = "PENDIENTE";
    statusProject["EN_PROCESO"] = "EN_PROCESO";
    statusProject["FINALIZADO"] = "FINALIZADO";
})(statusProject = exports.statusProject || (exports.statusProject = {}));
let Project = class Project {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: statusProject,
        default: statusProject.PENDIENTE,
    }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Project.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], Project.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.projects_team),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', foreignKeyConstraintName: 'fk_user_project' }),
    __metadata("design:type", user_entity_1.User)
], Project.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => user_entity_1.User, (user) => user.projects, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        joinColumn: {
            name: 'project_id',
        },
        inverseJoinColumn: {
            name: 'user_id',
        },
    }),
    __metadata("design:type", Array)
], Project.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], Project.prototype, "deletedAt", void 0);
Project = __decorate([
    (0, typeorm_1.Entity)({
        name: 'projects',
    })
], Project);
exports.Project = Project;
//# sourceMappingURL=project.entity.js.map