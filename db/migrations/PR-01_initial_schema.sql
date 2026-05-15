-- 1. DROP TABLES (In order of dependency)
DROP TABLE IF EXISTS salesdetail;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS pricehist;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS product;

-- 2. CREATE TABLES
CREATE TABLE product (
    prodcode VARCHAR(6) PRIMARY KEY,
    description VARCHAR(30),
    unit VARCHAR(3) CHECK (unit IN ('pc','ea','mtr','pkg','ltr'))
);

CREATE TABLE customer (
    custno VARCHAR(5) PRIMARY KEY, 
    custname VARCHAR(20), 
    address VARCHAR(50), 
    payterm VARCHAR(3) CHECK (payterm IN ('COD', '30D', '45D')),
    record_status VARCHAR(10) DEFAULT 'ACTIVE', 
    stamp VARCHAR(60)
);

CREATE TABLE pricehist (
    effdate DATE,
    prodcode VARCHAR(6) REFERENCES product(prodcode),
    unitprice DECIMAL(10,2) CHECK (unitprice > 0),
    PRIMARY KEY (effdate, prodcode)
);

CREATE TABLE sales (
    transno VARCHAR(8) PRIMARY KEY,
    salesdate DATE,
    custno VARCHAR(5) REFERENCES customer(custno),
    empno VARCHAR(5)
);

CREATE TABLE salesdetail (
    transno VARCHAR(8) REFERENCES sales(transno),
    prodcode VARCHAR(6) REFERENCES product(prodcode),
    quantity DECIMAL(10,2) CHECK (quantity >= 0),
    PRIMARY KEY (transno, prodcode)
);

-- 3. INSERT DATA
-- (Paste all your verified INSERT statements below this line)
-- Make sure the table names are lowercase: product, customer, pricehist, sales, salesdetail