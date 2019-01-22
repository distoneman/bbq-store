INSERT INTO cust_order (cust_id, order_date)
VALUES (${cust_id}, ${order_date})
RETURNING *;