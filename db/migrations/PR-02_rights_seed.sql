-- ==========================================
-- PR-02: RIGHTS MANAGEMENT SYSTEM
-- ==========================================
-- 1. CLEANUP (Run this to avoid "already exists" errors)
DROP TABLE IF EXISTS usermodule_rights;
DROP TABLE IF EXISTS user_module;
DROP TABLE IF EXISTS rights;
DROP TABLE IF EXISTS module;
DROP TABLE IF EXISTS "user";

-- 2. CREATE TABLES (Using "user" in quotes)
-- 1. Create Tables
CREATE TABLE "user" (
    email VARCHAR(50) PRIMARY KEY,
    fullname VARCHAR(50),
    password VARCHAR(100),
    record_status VARCHAR(10) DEFAULT 'ACTIVE'
);

CREATE TABLE module (
    module_code VARCHAR(10) PRIMARY KEY,
    module_name VARCHAR(30)
);

CREATE TABLE rights (
    right_code VARCHAR(15) PRIMARY KEY,
    right_description VARCHAR(50)
);

CREATE TABLE user_module (
    email VARCHAR(50) REFERENCES "user"(email),
    module_code VARCHAR(10) REFERENCES module(module_code),
    PRIMARY KEY (email, module_code)
);

CREATE TABLE usermodule_rights (
    email VARCHAR(50),
    module_code VARCHAR(10),
    right_code VARCHAR(15) REFERENCES rights(right_code),
    is_allowed INT DEFAULT 0,
    PRIMARY KEY (email, module_code, right_code),
    FOREIGN KEY (email, module_code) REFERENCES user_module (email, module_code)
);

-- 2. Seed Data
INSERT INTO module (module_code, module_name) VALUES 
('Cust_Mod', 'Customer Management'),
('Sales_Mod', 'Sales Management'),
('Prod_Mod', 'Product Management'),
('Adm_Mod', 'Administration');

INSERT INTO rights (right_code, right_description) VALUES 
('CUST_VIEW', 'View Customer'), ('CUST_ADD', 'Add Customer'), 
('CUST_EDIT', 'Edit Customer'), ('CUST_DEL', 'Delete Customer'),
('SALES_VIEW', 'View Sales'), ('SD_VIEW', 'View Sales Detail'),
('PROD_VIEW', 'View Products'), ('PRICE_VIEW', 'View Price History'),
('ADM_USER', 'Administer Users');

-- 3. Seed Superadmin
INSERT INTO "user" (email, fullname, password) 
VALUES ('jcesperanza@neu.edu.ph', 'Super Admin', 'password123');

INSERT INTO user_module (email, module_code)
SELECT 'jcesperanza@neu.edu.ph', module_code FROM module;

INSERT INTO usermodule_rights (email, module_code, right_code, is_allowed)
SELECT 'jcesperanza@neu.edu.ph', m.module_code, r.right_code, 1
FROM module m, rights r;

-- 4. Enable Security (Corrected with quotes)
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;