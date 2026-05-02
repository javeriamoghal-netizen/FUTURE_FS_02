🚀 Mini CRM - Client Lead Management System

📌 Project Overview

This project is a Mini CRM (Customer Relationship Management System) designed to manage client leads generated from website contact forms. It allows users to create, track, update, and manage leads efficiently.

---

🛠️ Tech Stack

Frontend

- React.js
- HTML / CSS
- Bootstrap

Backend

- Node.js
- Express.js

Database

- MongoDB (Mongoose)

---

✨ Features

✔ Add new leads (name, email, phone, source, notes, follow-up date)
✔ View all leads in a structured list
✔ Update lead status:

- New
- Contacted
- Converted

✔ Delete leads
✔ Search leads by name or email
✔ Follow-up date tracking

---

📂 Project Structure

mini-crm/
│
├── client/        # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/        # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
└── README.md

---

⚙️ Setup Instructions

🔹 1. Clone Repository

git clone https://github.com/your-username/mini-crm.git
cd mini-crm

---

🔹 2. Backend Setup

cd server
npm install

Create a ".env" file:

MONGO_URI=your_mongodb_connection_string
PORT=5002

Run backend:

node server.js

---

🔹 3. Frontend Setup

cd client
npm install
npm start

Frontend runs on:

http://localhost:3000

Backend runs on:

http://localhost:5002

---

🔗 API Endpoints

Method| Endpoint| Description
GET| /api/leads| Get all leads
POST| /api/leads| Create new lead
PUT| /api/leads/:id| Update lead
DELETE| /api/leads/:id| Delete lead

---

🔐 Future Improvements

- User authentication (Admin login)
- Role-based access control
- Dashboard analytics
- Deployment (Frontend + Backend)
- Email notifications for follow-ups

---

🎯 Skills Demonstrated

- CRUD Operations
- REST API Development
- React State Management
- MongoDB Integration
- Full-Stack Development

---

📦 Deliverable

✔ Fully working Mini CRM application
✔ Source code hosted on GitHub
✔ Functional frontend + backend integration

---

🙌 Conclusion

This project demonstrates a complete full-stack implementation of a CRM system with real-world features like lead tracking, status updates, and follow-up management.

---
