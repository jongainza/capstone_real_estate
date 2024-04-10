DROP DATABASE IF EXISTS real_estate_db;

CREATE DATABASE real_estate_db;

\c real_estate_db

-- DROP TABLE IF EXISTS user;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT  NOT NULL UNIQUE,
    email TEXT   NOT NULL UNIQUE,
    password TEXT  NOT NULL,
    registration_date timestamp with time zone   NOT NULL,
    updated_date timestamp with time zone,
    photo TEXT
   
    
);
-- DROP TABLE IF EXISTS property;

CREATE TABLE property (
    property_id SERIAL PRIMARY KEY,
    title TEXT   NOT NULL,
    info TEXT   NOT NULL,
    street TEXT   NOT NULL,
    number TEXT   NOT NULL,
    city TEXT   NOT NULL,
    state TEXT   NOT NULL,
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



INSERT INTO users 
(username,email,password,registration_date)
VALUES
('jon','jon@gmail.com','jon','2024-03-27'),
('blanca','blanca@gmail.com','blanca','2020-02-27'),
('kerman','kerman@gmail.com','kerman','2021-05-27'),
('star','star@gmail.com','star','2019-10-27');


INSERT INTO property
(title,info,street,number,city,state,country,zip_code,price,area,bedrooms,bathrooms,image_url,user_id)
VALUES
('beutiful house','remodeled house in hystoric district','persifer',1007,'Folsom','California','USA',95630,500000,'hystoric folsom',2,1,'asfaslfal;sf',1),
('american dream','all you can imagine','maple',3005,'Oakland','California','USA',95612,10000000,'laurel district',2,1,'sdghdsgfd',2),
('kermans playground','kermans fan area','ridley',23,'Orangevale','California','USA',95814,250000000,'nicest neighbourhood',1,1,'sdgsdggdvas',3),
('retreat house','beutiful pool','linda ave',696,'Oakland','California','USA',95616,30000000,'piedmont',4,3,'dsgsdfsa',4),
('mans cave','beutiful hause with men dreamed garage','bizkaia',14,'Barakaldp','Vizcaya','Spain' ,94140,500000,'centro',4,3,'asdgdsg',1);


INSERT INTO bid
(amount,bid_date,user_id,property_id)
VALUES
(5000000,'2021-05-27',1,1);