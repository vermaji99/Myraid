# TaskMaster Pro - Full Stack Technical Assessment

A production-ready Task Management Application built with the MERN stack, demonstrating advanced security practices, clean architecture, and modern UI/UX.

## 🚀 Live Demo
- **Frontend**: [http://localhost:5175/](http://localhost:5175/)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

## 🏗️ Architecture Overview

The application follows a **Modular Layered Architecture** for the backend and a **Context-driven Component Architecture** for the frontend.

### Backend (Node.js/Express)
- **Controller Layer**: Handles HTTP requests/responses.
- **Service Layer**: Contains the core business logic.
- **Model Layer**: Defines data structures and encryption/decryption hooks.
- **Middleware Layer**: Handles authentication, validation, and security (CORS, Rate Limiting, Helmet).

### Frontend (React/Vite)
- **Context API**: Manages global authentication state.
- **Service Layer**: Centralized Axios instance for API communication with interceptors.
- **UI Layer**: Functional components styled with Tailwind CSS v4 and Lucide Icons.

## 🔒 Security Implementations

- **JWT Authentication**: Secure stateless authentication using JSON Web Tokens.
- **HTTP-only Cookies**: Access tokens are stored in `HttpOnly`, `Secure` (in production), and `SameSite: Strict` cookies to mitigate XSS and CSRF.
- **Field-level AES Encryption**: Sensitive fields (Task Title and Description) are encrypted using **AES-256** before being saved to MongoDB and decrypted only at the model level upon retrieval.
- **Password Hashing**: Uses **Bcrypt** with a salt factor of 10.
- **Centralized Validation**: Uses **Joi** to validate all incoming request bodies.
- **Security Middlewares**: 
  - `Helmet`: Sets secure HTTP headers.
  - `Express-Mongo-Sanitize`: Prevents NoSQL Injection.
  - `Express-Rate-Limit`: Prevents brute-force and DDoS attacks.

## 🛠️ Functional Features

- **Auth**: User registration and login with real-time feedback.
- **Tasks**: Full CRUD (Create, Read, Update, Delete) for personal tasks.
- **Filtering**: Filter tasks by status (Pending, In-Progress, Completed).
- **Search**: Real-time debounced search (500ms) that filters through decrypted task data.
- **Pagination**: Server-side pagination for optimized task listing.
- **UI/UX**: Modern, responsive design with "Glassmorphism" elements and smooth transitions.

## 📡 API Documentation

### Authentication
- `POST /api/auth/register` - Create a new user.
- `POST /api/auth/login` - Authenticate and receive a secure cookie.
- `GET /api/auth/logout` - Clear the auth cookie.

### Tasks (Protected)
- `GET /api/tasks` - List tasks (Supports `page`, `limit`, `status`, `search`).
- `POST /api/tasks` - Create a new task.
- `GET /api/tasks/:id` - Get a single task.
- `PUT /api/tasks/:id` - Update an existing task.
- `DELETE /api/tasks/:id` - Delete a task.

## ⚙️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   ```

2. **Backend Setup**:
   - `cd backend`
   - `npm install`
   - Create a `.env` file with:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     CRYPTO_SECRET=your_aes_secret
     CLIENT_URL=http://localhost:5175
     NODE_ENV=development
     ```
   - `npm run dev`

3. **Frontend Setup**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## 🧪 Evaluation Checkpoints
- [x] JWT + HTTP-only Cookies
- [x] AES Payload Encryption
- [x] Server-side Pagination
- [x] Debounced Search
- [x] Centralized Error Handling
- [x] Modern Tailwind UI
