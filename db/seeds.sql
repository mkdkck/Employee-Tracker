INSERT INTO department (dep_name)
VALUES
    ('Human Resources'),
    ('Finance'),
    ('Marketing'),
    ('Engineering');

INSERT INTO employee_role (title,salary,dep_id)
VALUES 
    ('HR Manager', 80000.00, 1),
    ('Accountant', 60000.00, 2),
    ('Marketing Specialist', 70000.00, 3),
    ('Software Engineer', 90000.00, 4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES 
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Mike', 'Johnson', 3, 1),
    ('Emily', 'Williams', 4, NULL),
    ('Chris', 'Brown', 4, 2);