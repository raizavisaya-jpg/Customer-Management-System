\# Sprint 2 Rights Test Matrix



\*\*Role:\*\* M5 QA / Documentation  

\*\*Branch:\*\* test/sprint2-rights-27-cases  

\*\*PR:\*\* M5PR1 - Rights Test Matrix  

\*\*Feature:\*\* User Rights Validation  

\*\*Scope:\*\* 3 user types × 9 rights = 27 test cases  



\---



\## Source of Rights



The following rights were found in:



`public/db/migrations/PR-02\_rights\_seed.sql`



| Right Code | Description |

|---|---|

| CUST\_VIEW | View Customer |

| CUST\_ADD | Add Customer |

| CUST\_EDIT | Edit Customer |

| CUST\_DEL | Delete Customer |

| SALES\_VIEW | View Sales |

| SD\_VIEW | View Sales Detail |

| PROD\_VIEW | View Products |

| PRICE\_VIEW | View Price History |

| ADM\_USER | Administer Users |



\---



\## Test Status Legend



| Status | Meaning |

|---|---|

| Pending | Feature or account not yet ready for final testing |

| Pass | Actual result matches expected result |

| Fail | Actual result does not match expected result |



\---



\## Rights Test Matrix



| Test Case ID | User Type | Right Code | Right Description | Expected Access | Actual Result | Status | Remarks |

|---|---|---|---|---|---|---|---|

| RTM-001 | SUPERADMIN | CUST\_VIEW | View Customer | Allowed | Pending | Pending | SUPERADMIN should have full access |

| RTM-002 | SUPERADMIN | CUST\_ADD | Add Customer | Allowed | Pending | Pending | SUPERADMIN should have full access |

| RTM-003 | SUPERADMIN | CUST\_EDIT | Edit Customer | Allowed | Pending | Pending | SUPERADMIN should have full access |

| RTM-004 | SUPERADMIN | CUST\_DEL | Delete Customer | Allowed | Pending | Pending | SUPERADMIN should have full access |

| RTM-005 | SUPERADMIN | SALES\_VIEW | View Sales | Allowed | Pending | Pending | SUPERADMIN should have full access |

| RTM-006 | SUPERADMIN | SD\_VIEW | View Sales Detail | Allowed | Pending | Pending | SUPERADMIN should have full access |

| RTM-007 | SUPERADMIN | PROD\_VIEW | View Products | Allowed | Pending | Pending | SUPERADMIN should have full access |

| RTM-008 | SUPERADMIN | PRICE\_VIEW | View Price History | Allowed | Pending | Pending | SUPERADMIN should have full access |

| RTM-009 | SUPERADMIN | ADM\_USER | Administer Users | Allowed | Pending | Pending | SUPERADMIN should have full access |

| RTM-010 | ADMIN | CUST\_VIEW | View Customer | Allowed | Pending | Pending | ADMIN should view customer records |

| RTM-011 | ADMIN | CUST\_ADD | Add Customer | Allowed | Pending | Pending | ADMIN should add customer records |

| RTM-012 | ADMIN | CUST\_EDIT | Edit Customer | Allowed | Pending | Pending | ADMIN should edit customer records |

| RTM-013 | ADMIN | CUST\_DEL | Delete Customer | Allowed | Pending | Pending | ADMIN should soft-delete customer records |

| RTM-014 | ADMIN | SALES\_VIEW | View Sales | Allowed | Pending | Pending | ADMIN should view sales records |

| RTM-015 | ADMIN | SD\_VIEW | View Sales Detail | Allowed | Pending | Pending | ADMIN should view sales detail records |

| RTM-016 | ADMIN | PROD\_VIEW | View Products | Allowed | Pending | Pending | ADMIN should view products |

| RTM-017 | ADMIN | PRICE\_VIEW | View Price History | Allowed | Pending | Pending | ADMIN should view price history |

| RTM-018 | ADMIN | ADM\_USER | Administer Users | Denied | Pending | Pending | ADMIN should not manage user administration unless granted |

| RTM-019 | USER | CUST\_VIEW | View Customer | Allowed | Pending | Pending | USER should view active customers only |

| RTM-020 | USER | CUST\_ADD | Add Customer | Denied | Pending | Pending | USER should not add customers |

| RTM-021 | USER | CUST\_EDIT | Edit Customer | Denied | Pending | Pending | USER should not edit customers |

| RTM-022 | USER | CUST\_DEL | Delete Customer | Denied | Pending | Pending | USER should not delete or soft-delete customers |

| RTM-023 | USER | SALES\_VIEW | View Sales | Allowed | Pending | Pending | USER should view sales records only |

| RTM-024 | USER | SD\_VIEW | View Sales Detail | Allowed | Pending | Pending | USER should view sales detail records only |

| RTM-025 | USER | PROD\_VIEW | View Products | Allowed | Pending | Pending | USER should view products only |

| RTM-026 | USER | PRICE\_VIEW | View Price History | Allowed | Pending | Pending | USER should view price history only |

| RTM-027 | USER | ADM\_USER | Administer Users | Denied | Pending | Pending | USER should not administer users |



\---



\## Notes



\- SUPERADMIN rights are currently seeded in `PR-02\_rights\_seed.sql`.

\- ADMIN and USER expected access are based on Sprint 2 requirements.

\- Final Pass/Fail results will be updated once Sprint 2 features and test accounts are available in `dev`.

\- This document is for PR-01 and focuses on preparing the 27-case rights test matrix.



\---



\## Summary



| User Type | Total Rights Tested | Allowed Expected | Denied Expected | Current Status |

|---|---:|---:|---:|---|

| SUPERADMIN | 9 | 9 | 0 | Pending |

| ADMIN | 9 | 8 | 1 | Pending |

| USER | 9 | 5 | 4 | Pending |

| \*\*Total\*\* | \*\*27\*\* | \*\*22\*\* | \*\*5\*\* | \*\*Pending\*\* |

