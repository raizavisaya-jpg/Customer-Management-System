-- ========================================================
-- SPRINT 2 - PR-02: SQL VIEWS IMPLEMENTATION (FINAL FIXED)
-- ========================================================

-- --------------------------------------------------------
-- 1. VIEW: product_current_price
-- --------------------------------------------------------
-- Captures the latest active pricing tier for products based on effective date
CREATE OR REPLACE VIEW public.product_current_price AS
SELECT 
    p.prodcode,
    p.description AS product_name,
    ph.unitprice AS current_price,
    ph.effdate AS effective_date
FROM public.product p
JOIN public.pricehist ph ON p.prodcode = ph.prodcode
WHERE ph.effdate = (
    SELECT MAX(sub_ph.effdate) 
    FROM public.pricehist sub_ph 
    WHERE sub_ph.prodcode = p.prodcode 
      AND sub_ph.effdate <= CURRENT_DATE
);

-- --------------------------------------------------------
-- 2. VIEW: customer_sales_summary
-- --------------------------------------------------------
-- Aggregates orders and calculates expenditures using current product price view
CREATE OR REPLACE VIEW public.customer_sales_summary AS
SELECT 
    c.custno,
    c.custname,
    COUNT(DISTINCT s.transno) AS total_orders,
    COALESCE(SUM(sd.quantity * pcp.current_price), 0) AS total_spent
FROM public.customer c
LEFT JOIN public.sales s ON c.custno = s.custno
LEFT JOIN public.salesdetail sd ON s.transno = sd.transno
LEFT JOIN public.product_current_price pcp ON sd.prodcode = pcp.prodcode
GROUP BY c.custno, c.custname;