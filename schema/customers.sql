CREATE TABLE customer (
    cust_id SERIAL PRIMARY KEY,
    cust_firstname VARCHAR(25),
    cust_lastname VARCHAR(30),
    cust_email VARCHAR(75),
    cust_hash VARCHAR(150)
)