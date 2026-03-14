# TaskMaster Pro

A personal task management app built for the technical assessment. It uses Node.js, Express, React, and MongoDB.

## Features
- Login and Register with JWT
- Secure cookie storage
- AES encryption for task data
- Task CRUD (Create, Read, Update, Delete)
- Search and Filter by status
- Clean and responsive UI

## How to run locally

### 1. Backend
- Go to `backend` folder
- `npm install`
- Create `.env` file (see `.env.example` or below)
- `npm run dev`

### 2. Frontend
- Go to `frontend` folder
- `npm install`
- `npm run dev`

## API Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/tasks` - Get tasks (with search/pagination)
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
