CREATE DATABASE login;
CREATE TABLE studentusers(
    id SERIAL PRIMARY KEY NOT NULL,
    name varchar(30) UNIQUE NOT NULL,
    password varchar(30) NOT NULL

);