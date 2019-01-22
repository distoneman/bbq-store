SELECT c.cust_id, c.cust_firstname, c.cust_lastname, a.address_id, a.address_1, a.address_2, a.city, a.state, a.zip
FROM customer as c
JOIN cust_address as a ON c.cust_id = a.cust_id 
WHERE c.cust_id = 24;