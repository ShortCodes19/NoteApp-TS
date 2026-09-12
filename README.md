# 📝 NoteApp

A modern, full-stack note-taking application that lets you capture, organize, and manage your thoughts with a clean, minimal interface. Built with a **React + TypeScript** front end and a **Node.js + Express + MongoDB** REST API, complete with secure JWT-based authentication.

> **Capture your thoughts** — a simple, fast, and beautiful way to keep notes.

---

## ✨ Features

- 🔐 **User authentication** — register, log in, log out
  - Passwords hashed with **bcrypt**
  - **JWT** tokens stored in secure **HTTP-only cookies**
  - Session persistence via a `check-auth` endpoint on app load
  - Protected routes redirect unauthenticated users to the login page
- 📒 **Full note CRUD** — create, read, update, and delete notes
  - Notes are scoped to the logged-in user (each user only sees their own notes)
  - Inline edit flow with cancel support
  - Delete confirmation before removal
- 🧩 **Responsive, polished UI** styled with **Tailwind CSS v4**
  - Gradient auth screens with a custom brand layout
  - Sticky top bar, note cards, empty/loading states, and dismissible error banners
- 🛡️ **Server-side validation & error handling**
  - Centralized error middleware and a 404 handler
  - Validation for required fields, duplicate emails, and invalid/expired tokens

---

## 🧰 Tech Stack

### Frontend (`frontend/`)

- **React 19** + **TypeScript**
- **Vite** (build tool & dev server)
- **Tailwind CSS v4** (styling, via `@tailwindcss/vite`)
- **React Router v7** (client-side routing & protected routes)
- **Axios** (HTTP client, credentials/cookies enabled)
- **oxlint** (linting)

### Backend (`backend/`)

- **Node.js** + **Express 5**
- **MongoDB** with **Mongoose 9** (ODM)
- **JSON Web Tokens (JWT)** for authentication
- **bcrypt** for password hashing
- **cookie-parser** & **cors** (credential-aware)
- **dotenv** for environment configuration

---

## 📁 Project Structure

```
NoteAppTs/
├── backend/                    # Express REST API
│   ├── config/
│   │   └── AppDB.js            # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # register / login / logout / check-auth
│   │   └── NoteController.js   # notes CRUD
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT protected-route guard
│   │   └── errorMiddleware.js  # 404 + global error handler
│   ├── models/
│   │   ├── UserModel.js        # User schema
│   │   └── NoteModel.js        # Note schema
│   ├── routes/
│   │   ├── authRoutes.js       # /api/auth/*
│   │   └── NoteRoute.js        # /api/notes/*
│   ├── server.js               # App entry point
│   └── package.json
│
└── frontend/                   # React SPA
    ├── src/
    │   ├── components/
    │   │   ├── AuthLayout.tsx  # Auth page layout/branding
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── Notes.tsx       # Main notes view + logic
    │   │   ├── NoteForm.tsx
    │   │   ├── NoteList.tsx
    │   │   ├── NoteCard.tsx
    │   │   └── ProtectedRoute.tsx
    │   ├── context/
    │   │   └── AuthContext.tsx # Global auth state
    │   ├── services/
    │   │   ├── AuthApi.ts      # Auth API calls
    │   │   └── NoteApi.ts      # Notes API calls
    │   ├── types/
    │   │   └── NoteType.ts     # Shared TS types
    │   ├── App.tsx             # Route definitions
    │   ├── main.tsx            # React entry point
    │   └── index.css           # Tailwind theme & global styles
    ├── index.html
    ├── vite.config.ts
    └── package.json

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended — developed/tested on v24)
- **pnpm** (the project uses `pnpm`; version `^11.22.0`)
- A **MongoDB** instance (local or MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/ShortCodes19/NoteApp-TS.git
cd NoteAppTs
```

### 2. Set up environment variables

The project uses `.env` files for configuration. Create them as described below (both are gitignored).

#### Backend — `backend/.env`

```env
PORT=3002
MONGO_URL=mongodb://127.0.0.1:27017/noteapp
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
JWT_SECRET=your-super-secret-key
```

| Variable         | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `PORT`           | Port the API listens on (default: `3002`)               |
| `MONGO_URL`      | MongoDB connection string                               |
| `FRONTEND_URL`   | Allowed CORS origin (the Vite dev server URL)           |
| `NODE_ENV`       | `development` / `production`                            |
| `JWT_SECRET`     | Secret used to sign and verify JWT tokens               |

#### Frontend — `frontend/.env`

```env
VITE_NOTE_API=http://localhost:3002/api/notes
VITE_AUTH_API=http://localhost:3002/api/auth
```

| Variable          | Description                                    |
| ----------------- | ---------------------------------------------- |
| `VITE_NOTE_API`   | Base URL for the notes API                     |
| `VITE_AUTH_API`   | Base URL for the authentication API            |

### 3. Install dependencies & run

Install dependencies **in each directory**:

```bash
# Backend
cd backend
pnpm install
pnpm dev          # starts nodemon on http://localhost:3002

# Frontend (in a second terminal)
cd frontend
pnpm install
pnpm dev          # starts Vite on http://localhost:5173
```

Then open **http://localhost:5173** in your browser.

### Available scripts

**Backend** (`backend/`):

| Script | Description                          |
| ------ | ------------------------------------ |
| `pnpm dev` | Start the server with `nodemon` |

**Frontend** (`frontend/`):

| Script        | Description                            |
| ------------- | -------------------------------------- |
| `pnpm dev`     | Start the Vite dev server        |
| `pnpm build`   | Type-check (`tsc -b`) and build  |
| `pnpm lint`    | Lint with `oxlint`               |
| `pnpm preview` | Preview the production build     |

---

## 🔌 API Reference

All note endpoints are **protected** — they require a valid session cookie (`token`).

### Authentication — `/api/auth`

| Method | Endpoint      | Description                     |
| ------ | ------------- | ------------------------------- |
| POST   | `/register`   | Create a new user account       |
| POST   | `/login`      | Log in an existing user         |
| POST   | `/logout`     | Clear the auth session cookie   |
| GET    | `/check-auth` | Verify the session, return user |

**Register** request body:
```json
{ "name": "Jane Doe", "email": "jane@example.com", "password": "secret123" }
```

**Login** request body:
```json
{ "email": "jane@example.com", "password": "secret123" }
```

### Notes — `/api/notes`

| Method | Endpoint  | Description                        |
| ------ | --------- | ---------------------------------- |
| POST   | `/`       | Create a note                      |
| GET    | `/`       | List all notes for the logged-in user |
| GET    | `/:id`    | Get a single note                  |
| PUT    | `/:id`    | Update a note                      |
| DELETE | `/:id`    | Delete a note                      |

**Create / Update** request body:
```json
{ "title": "Grocery list", "content": "Milk, eggs, bread" }
```

---

## 🗺️ Routing (Frontend)

| Route       | Description                                        |
| ----------- | -------------------------------------------------- |
| `/`         | Redirects to `/notes`                              |
| `/login`    | Login page                                         |
| `/register` | Registration page                                  |
| `/notes`    | Main notes dashboard (protected — requires login)  |

---

## 🔐 How Authentication Works

1. On **register/login**, the backend hashes/verifies the password and issues a **JWT** (30-day expiry).
2. The token is stored in an **HTTP-only cookie**, so it is never exposed to client-side JavaScript (XSS-safe).
3. The frontend calls `/api/auth/check-auth` on load (via `AuthContext`) to restore the session.
4. `ProtectedRoute` blocks access to `/notes` unless a valid session exists.
5. On **logout**, the cookie is cleared and the user is redirected to `/login`.

---

## 🛠️ Development Notes

- The frontend sends requests with `withCredentials: true`, and the backend enables CORS with `credentials: true` — the `FRONTEND_URL` must match the frontend origin exactly or login/session requests will fail.
- The project is set up as two independent packages (`backend/` and `frontend/`); there is currently **no root `package.json` workspace**, so run installs and scripts inside each folder.

---

## 📄 License

This project is open source and available under the **ISC** license (see the backend `package.json`).



