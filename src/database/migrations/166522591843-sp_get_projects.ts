import { MigrationInterface, QueryRunner } from 'typeorm';

export class spGetProjects1665225918420 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP PROCEDURE IF EXISTS get_projects;
    `);
  }
}
