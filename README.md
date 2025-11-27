# 📝 Task Manager – Frontend

This is the **frontend** of the Task Manager application built using **React + Vite**, **Redux Toolkit**, and **Material UI**.  
It communicates with a **Node.js + MongoDB backend**.

---

## 🚀 Live Demo

- **Frontend:** https://task-manager-uodate.netlify.app/  
- **Backend:** https://render.com/docs/web-services#port-binding

---

## 🛠️ Tech Stack

- React (Vite)
- Redux Toolkit
- Material UI
- React Router v6
- Custom API service 

---

## 📂 Folder Structure

```
src/
│── pages/
│   ├── SignIn.jsx
│   ├── SignUp.jsx
│   ├── Dashboard.jsx
│   ├── AddTask.jsx
│   └── EditTask.jsx
│
│── redux/
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       └── taskSlice.js
│
│── services/
│   └── api.js
│
│── context/
│   └── ThemeContext.jsx
│
│── App.jsx
│── main.jsx
```

---

## 🔐 Features

- User Sign In / Sign Up  
- JWT-Based Authentication  
- Protected Routes  
- Add / Edit / Delete Tasks  
- Pagination (after 5 tasks)  
- Task creation date displayed  
- Loader + Form Validation  
- Fully responsive UI (Material UI)

---

## ▶️ Run Locally

```
npm install
npm run dev
```

App will start at:  
➡️ http://localhost:5173/

---

## 🏗️ Build for Production

```
npm run build
```

---

## 🌐 Deploy on Netlify

### **Build Command:**
```
npm run build
```

### **Publish Directory:**
```
dist
```

### 🔁 Fix Refresh / Routing Issue  
Create this file:

📁 `public/_redirects`

Add:

```
/*   /index.html   200
```

---

## 📡 API Endpoints Used

```
POST    /auth/signup
POST    /auth/signin
GET     /tasks
POST    /tasks
GET     /tasks/:id
PUT     /tasks/:id
DELETE  /tasks/:id
```

---
