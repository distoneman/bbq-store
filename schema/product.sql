CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    prod_brand_id INTEGER,
    prod_category_id INTEGER,
    pro_name VARCHAR(50),
    pro_desc TEXT,
    prod_size VARCHAR(25),
    prod_price FLOAT,
    prod_image text
)