-- ========================================================
-- SPRINT 2 - PR-01: ROW-LEVEL SECURITY (RLS) POLICIES
-- ========================================================

-- --------------------------------------------------------
-- 1. SECURITY HELPER FUNCTION
-- --------------------------------------------------------
CREATE OR REPLACE FUNCTION public.fn_has_right(required_right VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.usermodule_rights 
        WHERE email = auth.jwt() ->> 'email' 
          AND right_code = required_right 
          AND is_allowed = 1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------------------
-- 2. CUSTOMER TABLE RLS POLICIES
-- --------------------------------------------------------
ALTER TABLE public.customer ENABLE ROW LEVEL SECURITY;

-- USER can only see ACTIVE customers. ADMIN and SUPERADMIN can see all.
CREATE POLICY customer_select_policy ON public.customer    FOR SELECT
    USING (
        (record_status = 'ACTIVE') 
        OR (auth.jwt() ->> 'email' = 'jcesperanza@neu.edu.ph')
    );

-- Insert allowed only with CUST_ADD
CREATE POLICY customer_insert_policy ON public.customer
    FOR INSERT
    WITH CHECK (public.fn_has_right('CUST_ADD'));

-- Edit allowed only with CUST_EDIT
CREATE POLICY customer_update_policy ON public.customer
    FOR UPDATE
    USING (public.fn_has_right('CUST_EDIT'));

-- Soft-delete allowed only with CUST_DEL
CREATE POLICY customer_delete_policy ON public.customer
    FOR UPDATE
    USING (public.fn_has_right('CUST_DEL'));


-- --------------------------------------------------------
-- 3. READ-ONLY TABLES (sales, salesdetail, product, pricehist)
-- --------------------------------------------------------
-- Note: Making sure table names match Supabase's lower-case defaults
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salesdetail ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricehist ENABLE ROW LEVEL SECURITY;

-- Access rule: SELECT only for authenticated users
CREATE POLICY sales_select_only ON public.sales FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY salesdetail_select_only ON public.salesdetail FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY product_select_only ON public.product FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY pricehist_select_only ON public.pricehist FOR SELECT USING (auth.role() = 'authenticated');