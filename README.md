# Customer Management System (CMS)

A Customer Management System built using React, Vite, Tailwind CSS, Supabase, and Vitest. This project is developed as a group project for managing customers, sales, products, user roles, and authentication.

---

## Project Status

This project is currently under development for Sprint 1, Weeks 1–2.

### Completed Setup

- React + Vite project scaffold
- Tailwind CSS configuration
- Supabase JS client setup
- React Router setup
- ProtectedRoute structure
- Placeholder pages for:
  - `/customers`
  - `/sales`
  - `/products`
  - `/admin`
  - `/deleted-customers`
  - `/auth/callback`
- Email authentication setup
- AuthContext implementation
- Initial QA testing setup using Vitest

### Ongoing

- Google OAuth integration
- Database integration
- Final frontend functionality
- Final QA testing and validation

---

## Technologies Used

- React
- Vite
- Tailwind CSS
- Supabase
- React Router
- Vitest
- jsdom
- React Testing Library

---

## Branching Strategy

The project follows this GitHub branching structure:

- `main` → production or final stable branch
- `dev` → development branch
- `feature/*` → feature branches
- `qa-documentation` → QA testing and documentation branch

---

## Installation and Setup

### 1. Clone the Repository

    git clone <repository-link>

### 2. Open the Project Folder

    cd Customer-Management-System

This command opens the project folder in the terminal.

### 3. Install Dependencies

    npm install

### 4. Run the Development Server

    npm run dev

### 5. Open the Project

After running the development server, open the localhost link shown in the terminal.

Example:

    http://localhost:5173

---

## Running Tests

This project uses Vitest for automated testing.

### Run Tests

    npm run test

### Current QA Test Coverage

Initial authentication tests include:

- ACTIVE user access test
- INACTIVE user block test
- Protected route test

Current result:

    3 tests passed

---

## Project Pages

The following pages are included in the project structure:

- `/customers`
- `/sales`
- `/products`
- `/admin`
- `/deleted-customers`
- `/auth/callback`

---

## Authentication Features

### Implemented

- AuthContext
- `onAuthStateChange`
- `currentUser`
- `signOut`
- Email sign up
- Email sign in
- Login guard
- ProtectedRoute

### Ongoing

- Google OAuth setup using Supabase and Google Cloud

---

## QA / Documentation

The QA documentation includes:

- Test cases
- QA checklist
- Sprint log
- README draft
- ERD draft
- Automated testing results

Initial automated testing has been configured using Vitest, jsdom, and React Testing Library.

---

## Sprint 1 Progress

### Completed

- Project scaffold initialized
- Routing structure created
- Authentication context implemented
- Email login and registration connected
- Initial QA test environment configured
- Initial authentication tests created and passed

### Pending

- Google OAuth testing
- Database integration testing
- Final user rights testing
- Final soft-delete visibility testing
- Final view-only enforcement testing

---

## Notes

This README will be updated as development continues. Final QA testing will proceed once database integration and Google OAuth are fully completed.