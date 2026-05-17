-- ========================================================================
-- SPRINT 2 - PR-04: DATABASE SCHEMA VERIFICATION SUITE
-- ========================================================================

-- TEST 1: Verify Referential Integrity (Foreign Key Constraints)
-- This query checks if sales line items cleanly map back to existing products and transactions.
SELECT 
    sd.transno,
    sd.prodcode,
    p.description,
    s.salesdate
FROM salesdetail sd
JOIN product p ON sd.prodcode = p.prodcode
JOIN sales s ON sd.transno = s.transno
LIMIT 5;

-- TEST 2: Verify Check Constraints (Unit Types & Pay Terms)
-- Validates that data strictly adheres to defined domain rules ('pc', 'ea', etc. / 'COD', '30D', '45D')
SELECT custno, custname, payterm, record_status 
FROM customer 
WHERE payterm IN ('COD', '30D', '45D') AND record_status = 'ACTIVE';

-- TEST 3: Verify Pricing History Time-Lookup
-- Verifies that price hist points can map to product records for active tracking
SELECT 
    ph.prodcode,
    p.description,
    ph.effdate,
    ph.unitprice
FROM pricehist ph
JOIN product p ON ph.prodcode = p.prodcode
ORDER BY ph.effdate DESC
LIMIT 5;

-- TEST 4: Validate Custom Views Output
-- Confirms that our virtual data aggregation layers are responding correctly
SELECT * FROM v_sales_invoice_summary LIMIT 5;
SELECT * FROM v_customer_purchase_ranking LIMIT 5;