# Customer Management System (CMS)

A web-based Customer Management System built for Hope, Inc. to manage customer records, sales transactions, product listings, user roles, authentication, and access control.

---

## Project Status

This project is currently in Sprint 1, Weeks 1–2.

### Completed

- React + Vite project scaffold
- Tailwind CSS configuration
- Supabase JS client setup
- React Router setup
- ProtectedRoute structure
- Login page
- Register page
- AppShell layout
- Placeholder pages for:
  - `/customers`
  - `/sales`
  - `/products`
  - `/admin`
  - `/deleted-customers`
  - `/auth/callback`
- AuthContext setup
- Email sign up and sign in setup
- Google OAuth setup
- Initial QA testing environment using Vitest

### Pending / Ongoing

- Final database integration testing
- Final Google OAuth validation
- User rights testing
- Soft-delete visibility testing
- View-only enforcement testing
- Final manual QA validation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Backend / Auth | Supabase |
| Testing | Vitest, jsdom, React Testing Library |
| Version Control | Git and GitHub |

---

## Branching Strategy

The project follows this branching strategy:

| Branch | Purpose |
|---|---|
| `main` | Stable / production-ready branch |
| `dev` | Development branch |
| `feature/*` | Feature branches |
| `test/sprint1-auth-flows` | QA authentication test branch |
| `docs/sprint1-log-readme` | Documentation branch |

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-link>