SELECT c.cust_id, c.cust_email, c.cust_firstname, c.cust_lastname, co.order_id, co.order_date,
    oi.product_id, p.prod_name, oi.prod_price, oi.quantity, oi.prod_price * oi.quantity as price
FROM customer AS c
JOIN cust_order AS co ON c.cust_id = co.cust_id
JOIN order_item AS oi ON co.order_id = oi.order_id
JOIN product AS p ON oi.product_id = p.prod_id
WHERE oi.order_id = ${order_id};