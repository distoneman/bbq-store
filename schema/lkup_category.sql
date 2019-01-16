CREATE TABLE lkup_category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100)
)

INSERT INTO lkup_category (category_name) VALUES ('Grills');
INSERT INTO lkup_category (category_name) VALUES ('Smokers');
INSERT INTO lkup_category (category_name) VALUES ('Rubs');
INSERT INTO lkup_category (category_name) VALUES ('Sauce');
INSERT INTO lkup_category (category_name) VALUES ('Accessories');