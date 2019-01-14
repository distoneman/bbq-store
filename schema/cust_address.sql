CREATE TABLE cust_address (
    address_id SERIAL PRIMARY KEY,
    cust_id INTEGER,
    address_1 VARCHAR(50),
    address_2 VARCHAR(50),
    city VARCHAR(75),
    state VARCHAR(2),
    zip VARCHAR(15)
)