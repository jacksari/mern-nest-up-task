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