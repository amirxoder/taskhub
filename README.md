# TaskHub

TaskHub is a full-stack task management application with a TypeScript backend and a Next.js frontend.

## Project Structure

- `backend/`: Express + TypeScript API service
- `frontend/`: Next.js application with React, Tailwind, and auth UI

## Features

- User registration
- Password hashing with bcrypt
- MongoDB persistence with Mongoose
- CORS-enabled API for frontend integration
- Basic auth-related models and validation

## Backend

### Install dependencies

```bash
cd backend
pnpm install
```

### Environment Variables

Create a `.env` file in `backend/` with the following values:

```env
PORT=5000
NODE_NEV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/task_hub
```

### Run

```bash
cd backend
pnpm dev
```

### Build

```bash
cd backend
pnpm build
pnpm start
```

### API

Base URL: `http://localhost:5000/api/v1`

#### Register User

- Endpoint: `POST /register`
- Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePassword"
}
```

- Response:

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "email": "jane@example.com",
    "name": "Jane Doe",
    "isEmailVerified": false,
    "is2FAEnabled": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Database

The backend connects to MongoDB using `MONGODB_URI` and the database name `task_hub`.

## Frontend

### Install dependencies

```bash
cd frontend
pnpm install
```

### Run development server

```bash
cd frontend
pnpm dev
```

Open `http://localhost:3000` to view the app.

## Notes

- Each folder is independent and uses its own `package.json`.
- Use `pnpm` for package management if available.
- The frontend is designed to connect to the backend via the configured `FRONTEND_URL` and the API routes under `/api/v1`.

## Useful commands

```bash
cd backend && pnpm dev
cd frontend && pnpm dev
```

If you want to run both together, start each service in a separate terminal.
