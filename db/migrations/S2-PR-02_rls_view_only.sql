-- ========================================================
-- SPRINT 2 - PR-02: SELECT-ONLY RLS FOR VIEW-ONLY TABLES
-- ========================================================

ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salesdetail ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricehist ENABLE ROW LEVEL SECURITY;

-- Enforce strict read-only access for all authenticated users
CREATE POLICY "Allow read-only access to sales" 
ON public.sales FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read-only access to salesdetail" 
ON public.salesdetail FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read-only access to product" 
ON public.product FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read-only access to pricehist" 
ON public.pricehist FOR SELECT TO authenticated USING (true);