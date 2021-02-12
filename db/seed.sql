use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Tech'),
    ('Finance'),
    ('Marketing');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales', 120000, 1),
    ('Sales Asst.', 65000, 1),
    ('Engineer', 100000, 2),
    ('JR Engineer', 70000, 2),
    ('Accountant', 125000, 3),
     ('JR Accountant', 65000, 3),
    ('Project Manager', 120000, 4),
    ('JR Project Manager', 60000, 4);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
    ('Sharon', 'Needles', 4),
    ('Courtney', 'Act', 3),
    ('Kim', 'Chi', 2),
    ('Alyssa', 'Edwards',1),
    ('Roxxy', 'Andrews', 2)
    