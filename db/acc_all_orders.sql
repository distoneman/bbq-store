SELECT c.cust_id, c.cust_email, c.cust_firstname, c.cust_lastname, co.order_id, co.order_date 
FROM customer AS c
JOIN cust_order AS co ON c.cust_id = co.cust_id
WHERE c.cust_id = ${user_id};