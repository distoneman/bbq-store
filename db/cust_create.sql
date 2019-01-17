INSERT INTO customer
(
    cust_firstname, cust_lastname, cust_email, cust_hash
)
VALUES
(
    ${firstname}, ${lastname}, ${email}, ${hash}
)
RETURNING *;