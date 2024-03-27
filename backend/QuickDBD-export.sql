-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "User" (
    "user_id" int   NOT NULL,
    "username" string   NOT NULL,
    "email" string   NOT NULL,
    "password_hash" string   NOT NULL,
    "auth_token" string   NOT NULL,
    "registration_date" date   NOT NULL,
    CONSTRAINT "pk_User" PRIMARY KEY (
        "user_id"
     )
);

CREATE TABLE "Property" (
    "property_id" int   NOT NULL,
    "title" string   NOT NULL,
    "description" text   NOT NULL,
    "street" string   NOT NULL,
    "number" string   NOT NULL,
    "city" string   NOT NULL,
    "state" string   NOT NULL,
    "zip_code" string   NOT NULL,
    "price" int   NOT NULL,
    "area" string   NOT NULL,
    "bedrooms" int   NOT NULL,
    "bathrooms" int   NOT NULL,
    "image-url" url   NOT NULL,
    "user_id" int   NOT NULL,
    CONSTRAINT "pk_Property" PRIMARY KEY (
        "property_id"
     )
);

CREATE TABLE "Bid" (
    "bid_id" int   NOT NULL,
    "amount" int   NOT NULL,
    "bid_date" date   NOT NULL,
    "user_id" int   NOT NULL,
    "property_id" int   NOT NULL,
    CONSTRAINT "pk_Bid" PRIMARY KEY (
        "bid_id"
     )
);

CREATE TABLE "Transaction" (
    "transaction_id" int   NOT NULL,
    "transaction_date" date   NOT NULL,
    "buyer_id" int   NOT NULL,
    "seller_id" int   NOT NULL,
    "property_id" int   NOT NULL,
    "bid_id" int   NOT NULL,
    CONSTRAINT "pk_Transaction" PRIMARY KEY (
        "transaction_id"
     )
);

ALTER TABLE "Property" ADD CONSTRAINT "fk_Property_user_id" FOREIGN KEY("user_id")
REFERENCES "User" ("user_id");

ALTER TABLE "Bid" ADD CONSTRAINT "fk_Bid_user_id" FOREIGN KEY("user_id")
REFERENCES "User" ("user_id");

ALTER TABLE "Bid" ADD CONSTRAINT "fk_Bid_property_id" FOREIGN KEY("property_id")
REFERENCES "Property" ("property_id");

ALTER TABLE "Transaction" ADD CONSTRAINT "fk_Transaction_buyer_id" FOREIGN KEY("buyer_id")
REFERENCES "User" ("user_id");

ALTER TABLE "Transaction" ADD CONSTRAINT "fk_Transaction_seller_id" FOREIGN KEY("seller_id")
REFERENCES "User" ("user_id");

ALTER TABLE "Transaction" ADD CONSTRAINT "fk_Transaction_property_id" FOREIGN KEY("property_id")
REFERENCES "Property" ("property_id");

ALTER TABLE "Transaction" ADD CONSTRAINT "fk_Transaction_bid_id" FOREIGN KEY("bid_id")
REFERENCES "Bid" ("bid_id");

