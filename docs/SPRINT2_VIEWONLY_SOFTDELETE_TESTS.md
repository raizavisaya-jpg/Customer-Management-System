\---



\## Testing Update - Data Blocker



\*\*Date:\*\* May 18, 2026  

\*\*Status:\*\* Partially Verified / Blocked  



\### Static / Code Verification Results



The following checks were completed through code inspection and Git search:



| Check ID | Area | Result | Status | Notes |

|---|---|---|---|---|

| STATIC-001 | `getCustomers(userType)` | USER filters `record\_status = "ACTIVE"` | Pass | Confirms USER should only retrieve active customers |

| STATIC-002 | `softDeleteCustomer(custno)` | Updates `record\_status` to `"DELETED"` | Pass | Confirms soft-delete is used instead of permanent delete |

| STATIC-003 | `recoverCustomer(custno)` | Updates `record\_status` back to `"ACTIVE"` | Pass | Confirms recovery restores customer status |

| STATIC-004 | DELETE SQL search | No permanent DELETE SQL found for customer deletion | Pass | Codebase uses soft-delete logic |

| STATIC-005 | Sales/Product RLS | Sales, sales detail, product, and price history have SELECT-only policies | Pass | Supports view-only enforcement |



\### Manual Testing Blocker



Manual 3-user testing cannot be completed yet because the test database does not currently have the required sample data.



Blocked test areas:



\- Customer list visibility

\- Soft-delete visibility

\- Deleted Customers panel

\- Customer recovery

\- Sales view

\- Sales detail view

\- Product view

\- Price history view

\- Stamp column visibility



\### Required Test Data



The following data is needed before final Pass/Fail testing:



\- At least one ACTIVE customer, preferably `C0001`

\- At least one DELETED customer

\- Sales records linked to a customer

\- Sales detail records

\- Product records

\- Price history records



\### Current Manual Testing Status



| User Type | Account | Manual Testing Status | Reason |

|---|---|---|---|

| USER | alejandrotristanjay@gmail.com | Blocked | Required test data is missing |

| ADMIN | tristanjay.alejandro@neu.edu.ph | Blocked | Required test data is missing |

| SUPERADMIN | tristanjayreyes.alejandro06@gmail.com | Blocked | Required test data is missing |



\### Next Action



Manual testing will continue once the required seed/sample data is available in the test database.



