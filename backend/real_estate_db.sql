-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

DROP DATABASE IF EXISTS real_estate_db;

CREATE DATABASE real_estate_db;

\c real_estate_db

-- DROP TABLE IF EXISTS user;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT  NOT NULL,
    email TEXT   NOT NULL,
    password_hash TEXT  NOT NULL,
    auth_token TEXT   NOT NULL,
    registration_date DATE   NOT NULL
   
    
);
-- DROP TABLE IF EXISTS property;

CREATE TABLE property (
    property_id SERIAL PRIMARY KEY,
    title TEXT   NOT NULL,
    info TEXT   NOT NULL,
    street TEXT   NOT NULL,
    _number TEXT   NOT NULL,
    city TEXT   NOT NULL,
    _state TEXT   NOT NULL,
    country TEXT   NOT NULL,
    zip_code INTEGER   NOT NULL,
    price INTEGER   NOT NULL,
    area TEXT   NOT NULL,
    bedrooms INTEGER   NOT NULL,
    bathrooms INTEGER   NOT NULL,
    image_url TEXT   NOT NULL,
    user_id INTEGER   NOT NULL REFERENCES users
    
     );

-- DROP TABLE IF EXISTS bid;

CREATE TABLE bid (
    bid_id SERIAL PRIMARY KEY,
    amount INTEGER   NOT NULL,
    bid_date DATE  NOT NULL,
    user_id INTEGER   NOT NULL REFERENCES users ON DELETE CASCADE,
    property_id INTEGER   NOT NULL REFERENCES property ON DELETE CASCADE

);

-- DROP TABLE IF EXISTS transaction;

CREATE TABLE transaction (
    transaction_id SERIAL PRIMARY KEY,
    transaction_date DATE   NOT NULL,
    buyer_id INTEGER   NOT NULL REFERENCES users ON DELETE CASCADE,
    seller_id INTEGER   NOT NULL REFERENCES users ON DELETE CASCADE,
    property_id INTEGER   NOT NULL REFERENCES property ON DELETE CASCADE,
    bid_id INTEGER   NOT NULL REFERENCES bid ON  DELETE CASCADE
 
);



