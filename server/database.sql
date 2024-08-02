CREATE DATABASE login;
CREATE TABLE studentusers(
    id SERIAL  NOT NULL,
    name varchar(30) PRIMARY KEY UNIQUE NOT NULL,
    password varchar(30) NOT NULL

);

CREATE TABLE polls (
    id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(30) REFERENCES studentusers(name),
    question VARCHAR(60) NOT NULL,
    option1 VARCHAR(30) NOT NULL,
    option2 VARCHAR(30) NOT NULL,
    option3 VARCHAR(30)
);

CREATE TABLE form_polls(
   id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(30) REFERENCES studentusers(name),
    question VARCHAR(60) NOT NULL
);
CREATE TABLE responses(
    id SERIAL PRIMARY KEY,
    poll_id INTEGER REFERENCES polls(id),
    user_name VARCHAR(30) REFERENCES studentusers(name),
    response TEXT NOT NULL
);
CREATE TABLE form_responses(
    id SERIAL PRIMARY KEY,
    poll_id INTEGER REFERENCES form_polls(id),
    user_name VARCHAR(30) REFERENCES studentusers(name),
    response TEXT NOT NULL
);