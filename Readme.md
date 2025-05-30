# MERN Auth Web Application

A full-stack web application built using the **MERN** stack (MongoDB, Express.js, React, Node.js) with **Redux**, **React Router DOM**, and **Tailwind CSS**. This app features user authentication, allowing users to sign up and log in to access protected content.

## 🔐 Features

- User Signup and Login with secure authentication
- JWT-based authentication with token storage
- Protected routes after login
- Fully responsive UI with Tailwind CSS
- Redux for global state management
- React Router DOM for client-side routing
- Pages: Home, About, Features, Contact Us

## 🖥️ Tech Stack

**Frontend:**

- React
- Redux Toolkit
- React Router DOM
- Tailwind CSS

**Backend:**

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT (JSON Web Tokens)
- bcrypt.js for password hashing

## 📂 Project Structure

project-root/
│
├── backend/ # Express + MongoDB backend
├── frontend/ # React frontend (to be deployed on GitHub Pages)
├── package.json # Optional: only for managing root dependencies
├── package-lock.json  
├── README.md
└── .gitignore

### Frontend (`/client`)

- `src/slices/` – Redux slices for user, auth
- `src/components/` – Reusable UI components
- Tailwind CSS for styling

### Backend (`/server`)

- `router/userRouter.js` – Signup/Login and Updates routes
- `controller/userController.js` – Auth logic
- `models/userModel.js` – User schema with password hashing
- `middleware/authMiddleware.js` – JWT authentication

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/mern-auth-webapp.git
cd Mearn-auth

cd server
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

npm run dev
```
