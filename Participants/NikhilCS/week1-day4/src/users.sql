show databases;
create database training;
create table users(ID int auto_increment primary key,name varchar(20),emailid varchar(100));
INSERT INTO users (name, emailid) VALUES
('John Doe', 'john.doe@email.com'),
('Jane Smith', 'jane.smith@email.com'),
('Mike Johnson', 'mike.j@email.com'),
('Sarah Wilson', 'sarah.w@email.com'),
('David Brown', 'david.brown@email.com'),
('Emily Davis', 'emily.davis@email.com'),
('Chris Lee', 'chris.lee@email.com'),
('Lisa Chen', 'lisa.chen@email.com'),
('Raj Patel', 'raj.patel@email.com'),
('Priya Sharma', 'priya.sharma@email.com');
select * from users;
show databases;
use training;
show tables ;