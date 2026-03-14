# TaskMaster Pro - Full Stack Task Management System

A production-ready Task Management Application built as part of a 24-hour technical assessment. This project demonstrates a robust implementation of the MERN stack with a strong focus on security, clean architecture, and deployment readiness.

## 🚀 Live Demo & Links
- **Live Frontend:** [https://task-man-zqcm.onrender.com](https://task-man-zqcm.onrender.com)
- **Live Backend API:** [https://taskmaster-backend-8nyw.onrender.com/health](https://taskmaster-backend-8nyw.onrender.com/health)
- **GitHub Repository:** [https://github.com/vermaji99/Myraid](https://github.com/vermaji99/Myraid)

## 🛠 Tech Stack
- **Frontend:** React.js, Tailwind CSS, Axios, Lucide React, React Hot Toast
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JSON Web Tokens (JWT) with dual-storage strategy (HTTP-only Cookies + LocalStorage fallback)
- **Security:** AES Encryption (CryptoJS), Bcrypt password hashing, Helmet.js, Express Rate Limit, Mongo Sanitize

## 🏗 Architecture & Features

### 🔐 Authentication & Security
- **JWT Authentication:** Secure login and registration flow.
- **Secure Cookies:** Tokens are stored in `HttpOnly`, `Secure`, and `SameSite: None` cookies to prevent XSS.
- **Dual-Auth Strategy:** Implemented a Bearer token fallback in the `Authorization` header to ensure reliability across different deployment subdomains.
- **Sensitive Data Encryption:** Task titles and descriptions are encrypted using **AES-256** before being saved to MongoDB, ensuring that even with database access, task content remains private.
- **Password Hashing:** Industry-standard `bcryptjs` hashing with 10 salt rounds.
- **Security Middlewares:** 
  - `helmet`: Sets various HTTP headers for security.
  - `express-mongo-sanitize`: Prevents NoSQL injection attacks.
  - `express-rate-limit`: Protects against brute-force and DDoS attacks.

### 📁 Backend Design
- **Clean Architecture:** Separated into Controllers, Services, Models, Routes, Middlewares, and Validators.
- **Centralized Error Handling:** Custom `ErrorResponse` class and global error middleware for consistent API responses and proper HTTP status codes.
- **Input Validation:** Request bodies are validated using `Joi` schemas before reaching the controllers.
- **Pagination & Search:** Optimized task listing with server-side pagination, status filtering, and title/description search.

### 💻 Frontend Design
- **Responsive UI:** Built with Tailwind CSS for a modern, mobile-first experience.
- **Protected Routes:** React Router guards to prevent unauthorized access to the dashboard.
- **State Management:** Context API (`AuthContext`) for global user state and authentication logic.
- **UX Features:** Real-time feedback via `react-hot-toast`, debounced search, and smooth transitions.

## 🚦 API Documentation

### Auth Endpoints
- `POST /api/auth/register`: Create a new user.
- `POST /api/auth/login`: Authenticate user and receive token.
- `POST /api/auth/logout`: Clear authentication session.

### Task Endpoints
- `GET /api/tasks`: List user tasks.
  - Query Params: `page`, `limit`, `status` (pending/in-progress/completed), `search`.
- `POST /api/tasks`: Create a new task (automatically encrypted).
- `GET /api/tasks/:id`: Get task details.
- `PUT /api/tasks/:id`: Update task content or status.
- `DELETE /api/tasks/:id`: Remove a task.

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account

### Local Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CRYPTO_SECRET=your_aes_encryption_key
NODE_ENV=development
COOKIE_SECRET=your_cookie_secret
CLIENT_URL=http://localhost:5173
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api/
```

### Installation Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/vermaji99/Myraid.git
   cd Myraid
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
