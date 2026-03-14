# API Documentation - TaskMaster Pro

This documentation provides details on how to interact with the TaskMaster Pro API. All request and response bodies are in JSON format.

**Base URL:** `https://taskmaster-backend-8nyw.onrender.com/api`

---

## 🔐 Authentication

### 1. Register User
Create a new user account.
- **Endpoint:** `POST /auth/register`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "token": "JWT_TOKEN_STRING",
    "data": {
      "_id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### 2. Login User
Authenticate an existing user.
- **Endpoint:** `POST /auth/login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "token": "JWT_TOKEN_STRING",
    "data": {
      "_id": "USER_ID",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### 3. Logout User
Clear the authentication session.
- **Endpoint:** `POST /auth/logout`
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {}
  }
  ```

---

## 📝 Tasks (Protected)
*All task endpoints require a valid JWT token in the `Authorization` header as `Bearer <token>` or via secure cookies.*

### 1. Get All Tasks
Retrieve a list of tasks for the authenticated user with pagination and filtering.
- **Endpoint:** `GET /tasks`
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Tasks per page (default: 10)
  - `status`: Filter by `pending`, `in-progress`, or `completed`
  - `search`: Search by title or description
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 1,
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "pages": 1
    },
    "data": [
      {
        "_id": "TASK_ID",
        "title": "Decrypted Title",
        "description": "Decrypted Description",
        "status": "pending",
        "createdAt": "2024-03-14T..."
      }
    ]
  }
  ```

### 2. Create Task
Add a new task (automatically encrypted).
- **Endpoint:** `POST /tasks`
- **Request Body:**
  ```json
  {
    "title": "New Task",
    "description": "Task details here",
    "status": "pending"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "TASK_ID",
      "title": "New Task",
      "description": "Task details here",
      "status": "pending"
    }
  }
  ```

### 3. Update Task
Modify an existing task.
- **Endpoint:** `PUT /tasks/:id`
- **Request Body:** (any combination of fields)
  ```json
  {
    "title": "Updated Title",
    "status": "completed"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": { ...updatedTask }
  }
  ```

### 4. Delete Task
Remove a task.
- **Endpoint:** `DELETE /tasks/:id`
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {}
  }
  ```

---

## 🛠 Error Handling
The API uses standard HTTP status codes and returns a structured error response:
- **Status Codes:**
  - `400`: Bad Request (Validation failed)
  - `401`: Unauthorized (Invalid or missing token)
  - `404`: Not Found
  - `500`: Internal Server Error
- **Error Response Format:**
  ```json
  {
    "success": false,
    "message": "Detailed error message here"
  }
  ```
