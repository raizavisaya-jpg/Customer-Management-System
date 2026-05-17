# Sprint 1 Log — Customer Management System

**Prepared by:** Tristan Jay R. Alejandro  
**Role:** M5 — QA / Documentation Specialist  
**Sprint:** Sprint 1, Weeks 1–2  

---

## Team Members and Roles

| Member | Role |
|---|---|
| Raiza M. Visaya | Project Lead / Lead Developer |
| Jedric Gabriel H. Dela Cruz | Frontend Developer |
| Joepimme Antonn F. Querubin | Database Specialist |
| Johann Riel S. Esquejo | Rights & Authentication Specialist |
| Tristan Jay R. Alejandro | QA / Documentation Specialist |

---

## Tasks Completed This Sprint

### M5 — QA / Documentation Specialist

- Installed and configured Vitest, jsdom, and React Testing Library
- Created authentication flow test cases
- Executed automated authentication tests
- Verified login guard test cases
- Prepared QA checklist
- Prepared Sprint 1 documentation
- Updated README setup instructions

---

## Test Results

| Test Area | Result |
|---|---|
| ACTIVE user access | Initial Test Passed |
| INACTIVE user blocking | Initial Test Passed |
| Protected route logic | Initial Test Passed |
| Login page UI | Passed |
| Register page UI | Passed |
| Google OAuth | Pending / For final validation |
| Database integration | Pending |
| Final manual QA validation | Pending |

---

## Blockers

- Full Google OAuth validation depends on correct Supabase environment setup.
- Database integration is still being finalized.
- Final QA validation cannot be completed until backend, frontend, and authentication are fully connected.

---

## Resolutions

- QA testing environment was configured successfully.
- Missing dependencies were fixed.
- Local development server was successfully launched using `npm run dev`.
- Initial authentication tests were executed successfully.

---

## Next Sprint Goals

- Complete Google OAuth full-flow testing
- Complete email registration and sign-in testing
- Test database integration
- Test user rights and access control
- Test soft-delete visibility
- Test view-only enforcement
- Complete final manual QA validation