CREATE TABLE cust_order (
    order_id SERIAL PRIMARY KEY,
    cust_id INTEGER,
    order_date date,
    address_id INTEGER
)