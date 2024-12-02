-- Active: 1729549434613@@127.0.0.1@5432@likeme
CREATE DATABASE likeme;

CREATE TABLE posts (
    id SERIAL, 
    titulo VARCHAR(25), 
    img VARCHAR(1000),
    descripcion VARCHAR(255), 
    likes INT DEFAULT 0
);

