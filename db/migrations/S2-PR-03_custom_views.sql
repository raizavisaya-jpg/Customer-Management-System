-- 1. View to summarize sales transactions with total amounts per item
CREATE OR REPLACE VIEW v_sales_invoice_summary AS
SELECT 
    s.transno,
    s.salesdate,
    c.custname,
    sd.prodcode,
    p.description,
    sd.quantity,
    p.unit,
    ph.unitprice,
    (sd.quantity * ph.unitprice) AS total_item_amount
FROM sales s
JOIN customer c ON s.custno = c.custno
JOIN salesdetail sd ON s.transno = sd.transno
JOIN product p ON sd.prodcode = p.prodcode
-- Joins the price history matching the product code
LEFT JOIN pricehist ph ON sd.prodcode = ph.prodcode 
    AND ph.effdate = (
        SELECT MAX(effdate) 
        FROM pricehist 
        WHERE prodcode = sd.prodcode 
        AND effdate <= s.salesdate
    );

-- 2. View to see customer rankings based on their total purchases
CREATE OR REPLACE VIEW v_customer_purchase_ranking AS
SELECT 
    c.custno,
    c.custname,
    c.payterm,
    c.record_status,
    COALESCE(SUM(sd.quantity * ph.unitprice), 0) AS total_spent
FROM customer c
LEFT JOIN sales s ON c.custno = s.custno
LEFT JOIN salesdetail sd ON s.transno = sd.transno
LEFT JOIN pricehist ph ON sd.prodcode = ph.prodcode 
    AND ph.effdate = (
        SELECT MAX(effdate) 
        FROM pricehist 
        WHERE prodcode = sd.prodcode 
        AND effdate <= s.salesdate
    )
GROUP BY c.custno, c.custname, c.payterm, c.record_status;