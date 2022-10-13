"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spGetProjects1665225918420 = void 0;
class spGetProjects1665225918420 {
    async up(queryRunner) {
        await queryRunner.query(`DROP PROCEDURE IF EXISTS get_projects;`);
        await queryRunner.query(`
        CREATE PROCEDURE up_task.get_projects()
        BEGIN
            select  
                p.name, 
                p.description, 
                p.status, 
                p.date, 
                p.client, 
                json_object(
                'name', CONCAT(u.firstName,' ',u.lastName),
                'email', u.email ,  
                'status',u.status 
                ) user
            from projects p
            left join users u on u.id = p.user_id;
        END
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
        DROP PROCEDURE IF EXISTS get_projects;
    `);
    }
}
exports.spGetProjects1665225918420 = spGetProjects1665225918420;
//# sourceMappingURL=166522591843-sp_get_projects.js.map