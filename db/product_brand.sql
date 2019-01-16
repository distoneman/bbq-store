SELECT p.prod_id, p.prod_brand_id, b.brand_name, p.prod_category_id, p.prod_name, p.prod_image
FROM product as p
JOIN lkup_brand as b on p.prod_brand_id = b.brand_id
JOIN lkup_category as c on p.prod_category_id = c.category_id
WHERE b.brand_id = 2;