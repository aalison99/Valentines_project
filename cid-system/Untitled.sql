CREATE TABLE student(
	roll_no int primary key,
    name varchar(50),
    age int
    );
INSERT INTO student VALUES (1,"Alison", 19);
INSERT INTO student VALUES (2,"Chetan", 20);
INSERT INTO student VALUES (3,"Somya", 21);
CREATE TABLE course ( 
	course_id varchar(10) primary key, 
	course_name varchar(100), 
	credits int 
);
INSERT INTO course VALUES("C1","DBMS", 4);
INSERT INTO course VALUES("C2","DSA", 4);
INSERT INTO course VALUES("C3","Mathematics", 4);
CREATE TABLE takes(
roll int,
course_id varchar(10),
semester int ,

foreign key(roll) references student(roll_no),
foreign key(course_id) references course(course_id)
);
SELECT * FROM takes;
INSERT INTO takes VALUES(12,"C5", 4);
