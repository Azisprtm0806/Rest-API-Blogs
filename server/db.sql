CREATE DATABASE pern_auth;

create table users(
  user_id serial PRIMARY KEY,
  username varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  createdAt date default current_date
);

create table blogs(
  blog_id serial PRIMARY KEY,
  user_id INT NOT NULL,
  title varchar(255) UNIQUE NOT NULL,
  description varchar(255) NOT NULL,
  createdAt date default current_date,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id)
);


SELECT blogs.blog_id, blogs.title, blogs.description, blogs.createdAt, users.username FROM blogs FULL JOIN users ON blogs.user_id = users.user_id;
SELECT blogs.blog_id, blogs.title, blogs.description, blogs.createdAt, users.username FROM blogs NATURAL JOIN users WHERE user_id = $1;
SELECT * FROM blogs JOIN users USING(user_id) WHERE blogs.user_id  = users.user_id;
UPDATE blogs SET title = $1, description = $2, where blog_id = $4 returning *