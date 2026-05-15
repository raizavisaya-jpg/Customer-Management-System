-- ==========================================
-- PR-04: DATABASE VERIFICATION & AUDIT
-- ==========================================

-- 1. Row Count Verification
SELECT 'Customer' as category, count(*) FROM customer
UNION ALL
SELECT 'Sales', count(*) FROM sales
UNION ALL
SELECT 'Products', count(*) FROM product;

-- 2. Superadmin Rights Verification (Confirmed: 36)
SELECT count(*) as total_rights 
FROM usermodule_rights 
WHERE email = 'jcesperanza@neu.edu.ph' AND is_allowed = 1;

-- 3. Final Audit Report
SELECT 
    m.module_name, 
    r.right_description, 
    ur.is_allowed
FROM usermodule_rights ur
JOIN module m ON ur.module_code = m.module_code
JOIN rights r ON ur.right_code = r.right_code
WHERE ur.email = 'jcesperanza@neu.edu.ph'
ORDER BY m.module_name;