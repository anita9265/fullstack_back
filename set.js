// Perfect 👍
// હવે clear છે:

// તમે express-generator
// થી project બનાવ્યો છે
// તમે EJS use નથી કરવું
// તમારું work Postman API
// માં છે
// તમને proper MVC
// structure જોઈએ છે
// PostgreSQL + Prisma setup step by step જોઈએ છે

// તો હવે આપણે REST API project બનાવીએ.

// FINAL PROJECT STRUCTURE (MVC API)
// prisma_postgres_crud/
// │
// ├── bin/
// ├── public/
// ├── prisma/
// │   └── schema.prisma
// │
// ├── controllers/
// │   └── userController.js
// │
// ├── models/
// │   └── userModel.js
// │
// ├── routes/
// │   └── userRoutes.js
// │
// ├── prismaClient.js
// ├── app.js
// ├── .env
// ├── package.json
// └── node_modules/
// STEP 1 — Install Packages

// Terminal માં run કરો:

// npm install prisma --save-dev
// npm install @prisma/client pg
// STEP 2 — Initialize Prisma

// Run:

// npx prisma init

// આ પછી create થશે:

// prisma/
// .env
// STEP 3 — PostgreSQL Database Create

// PostgreSQL માં database બનાવો:

// CREATE DATABASE prisma_crud;
// STEP 4 — Configure DATABASE_URL

// .env

// DATABASE_URL="postgresql://postgres:1234@localhost:5432/prisma_crud?schema=public"

// Replace:

// postgres
// 1234
// prisma_crud

// with your values.

// STEP 5 — Prisma Schema

// Open:

// prisma/schema.prisma

// Replace:

// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

// model User {
//   id    Int    @id @default(autoincrement())
//   name  String
//   email String @unique
// }
// STEP 6 — Migration

// Run:

// npx prisma migrate dev --name init
// STEP 7 — Prisma Client

// Create file:

// prismaClient.js

// Add:

// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// module.exports = prisma;
// STEP 8 — Create Model

// Create:

// models/userModel.js

// Add:

// const prisma = require('../prismaClient');

// const getAllUsers = async () => {
//     return await prisma.user.findMany();
// };

// const createUser = async (data) => {
//     return await prisma.user.create({
//         data
//     });
// };

// module.exports = {
//     getAllUsers,
//     createUser
// };
// STEP 9 — Create Controller

// Create:

// controllers/userController.js

// Add:

// const userModel = require('../models/userModel');

// const getUsers = async (req, res) => {

//     const users = await userModel.getAllUsers();

//     res.json(users);
// };

// const addUser = async (req, res) => {

//     const { name, email } = req.body;

//     const user = await userModel.createUser({
//         name,
//         email
//     });

//     res.json({
//         message: "User Added",
//         user
//     });
// };

// module.exports = {
//     getUsers,
//     addUser
// };
// STEP 10 — Create Routes

// Create:

// routes/userRoutes.js

// Add:

// const express = require('express');

// const router = express.Router();

// const userController = require('../controllers/userController');

// router.get('/', userController.getUsers);

// router.post('/add', userController.addUser);

// module.exports = router;
// STEP 11 — Configure app.js

// Open app.js

// Replace/add:

// var express = require('express');

// var app = express();

// const userRoutes = require('./routes/userRoutes');

// app.use(express.json());

// app.use('/users', userRoutes);

// module.exports = app;
// STEP 12 — Start Server

// Run:

// npm start
// STEP 13 — Test in Postman
// GET USERS

// Method:

// GET

// URL:

// http://localhost:3000/users
// ADD USER

// Method:

// POST

// URL:

// http://localhost:3000/users/add

// Body → raw → JSON

// {
//   "name": "Meet",
//   "email": "meet@gmail.com"
// }
// MVC FLOW
// Route
//   ↓
// Controller
//   ↓
// Model
//   ↓
// Prisma
//   ↓
// PostgreSQL
// CURRENT FEATURES

//  Express Generator Structure
//  PostgreSQL Setup
//  Prisma Setup
//  MVC Pattern
//  REST API
//  Postman Testing

// NEXT STEP

// Next you can add:

// Update API
// Delete API
// Get Single User
// Validation
// Error Handling
// Async Middleware
// JWT Authentication

// step by step.


// with middleware/////////////////////////////////////////////////////////////////////////////////////


// હા 👍 હવે તું જે માંગે છે એ proper professional way (Middleware + JWT + no id/email in body) છે.

// એટલે logout/login બધું secure અને clean બની જશે.

//  FULL CHANGE (Middleware સાથે proper system)
//  Concept

//  હવે:

// id/email body માં નહિ મોકલવું
// token થી user ઓળખાશે
// middleware બધું handle કરશે
// 1️⃣ Middleware (verifyToken)
// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {

//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         return res.json({
//             message: "Token required"
//         });
//     }

//     try {

//         const token = authHeader.split(" ")[1];

//         const decoded = jwt.verify(token, "secretkey");

//         req.user = decoded;   //  important

//         next();

//     } catch (err) {
//         res.json({
//             message: "Invalid token"
//         });
//     }
// };

// module.exports = verifyToken;
// 2️⃣ Login (NO CHANGE MUCH)
// const jwt = require("jsonwebtoken");

// const login = async (req, res) => {

//     const { email, password } = req.body;

//     const user = await usermodel.finduserbyemail(email);

//     if (!user) {
//         return res.json({ message: "User not found" });
//     }

//     if (user.password !== password) {
//         return res.json({ message: "Invalid password" });
//     }

//     await usermodel.updateloginstatus(user.id, true);

//     const token = jwt.sign(
//         {
//             id: user.id,
//             email: user.email
//         },
//         "secretkey",
//         { expiresIn: "1h" }
//     );

//     res.json({
//         message: "Login successful",
//         token
//     });
// };
// 3️⃣ Logout ( MAIN CHANGE)

//  હવે id/email કંઈ જ નહિ જોઈએ

// const logout = async (req, res) => {

//     try {

//         const userId = req.user.id;   //  from middleware

//         const user = await usermodel.updateloginstatus(
//             userId,
//             false
//         );

//         res.json({
//             message: "Logout Successful",
//             user
//         });

//     } catch (err) {

//         res.json({
//             error: err.message
//         });

//     }
// };
// 4️⃣ Route (IMPORTANT CHANGE)
// const verifyToken = require("../middleware/verifyToken");

// router.post("/logout", verifyToken, logout);
// 📩 Postman Request
// Login
// POST /login
// Logout
// POST /logout
// Header:
// Authorization: Bearer YOUR_TOKEN

// Body:

// {}
//  FINAL FLOW
// Login
//   ↓
// Token generate

// Logout
//   ↓
// Middleware token verify
//   ↓
// req.user.id મળે
//   ↓
// DB update isLoggedin = false
//  WHAT CHANGED (VERY IMPORTANT)
// Before	After
// id/email body માં	 removed
// insecure	 secure
// direct access	middleware
// manual user fetch	token decoded
//  FINAL SIMPLE TRICK
// Token = Identity card
// Middleware = Security guard
// req.user = logged-in user
// 👍 Conclusion

//  હવે system:

// secure ✔
// professional ✔
// scalable ✔
// interview ready ✔

// જો તું ઈચ્છે તો હું તને next step માં:
//  “role based login (admin/user) + protected routes + refresh token” એક complete system બનાવી આપી દઉં 



// role based access//////////////////////////////////////////////////////////////////////////////////////
// Perfect 👍 — tame Prisma use karo cho, etle hu tamne MVC + RBAC + Prisma (production-style setup) step-by-step samjavu chu.

// Aa real-world project structure jevu che 

// 🏗️ 1. FINAL FOLDER STRUCTURE (Prisma + MVC + RBAC)
// project-root/
// │
// ├── prisma/
// │   ├── schema.prisma
// │
// ├── src/
// │   ├── config/
// │   │   └── prismaClient.js
// │   │
// │   ├── controllers/
// │   │   ├── auth.controller.js
// │   │   ├── admin.controller.js
// │   │   └── user.controller.js
// │   │
// │   ├── middlewares/
// │   │   ├── verifyToken.js
// │   │   └── checkRole.js
// │   │
// │   ├── routes/
// │   │   ├── auth.routes.js
// │   │   ├── admin.routes.js
// │   │   └── user.routes.js
// │   │
// │   ├── services/
// │   │   ├── auth.service.js
// │   │   ├── user.service.js
// │   │
// │   ├── utils/
// │   │   └── jwt.js
// │   │
// │   └── app.js
// │
// ├── server.js
// ├── .env
// └── package.json
//  2. PRISMA SETUP (IMPORTANT)
//  STEP 1: Install Prisma
// npm install prisma @prisma/client
// npx prisma init
//  STEP 2: Prisma Schema (RBAC add karo)
// 📁 prisma/schema.prisma
// model User {
//   id       Int    @id @default(autoincrement())
//   name     String
//   email    String @unique
//   password String
//   role     String @default("student")
// }

//  Roles:

// "admin"
// "trainer"
// "student"
//  STEP 3: DB migrate
// npx prisma migrate dev --name init
// 🔌 3. PRISMA CLIENT SETUP
// 📁 src/config/prismaClient.js
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// module.exports = prisma;
//  4. LOGIN (JWT + ROLE INCLUDE)
// 📁 auth.controller.js
// const prisma = require("../config/prismaClient");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await prisma.user.findUnique({
//     where: { email }
//   });

//   if (!user) {
//     return res.json({ message: "User not found" });
//   }

//   const match = await bcrypt.compare(password, user.password);

//   if (!match) {
//     return res.json({ message: "Invalid password" });
//   }

//   const token = jwt.sign(
//     {
//       id: user.id,
//       email: user.email,
//       role: user.role
//     },
//     "secretkey",
//     { expiresIn: "1h" }
//   );

//   res.json({ token });
// };
//  5. VERIFY TOKEN MIDDLEWARE
// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.json({ message: "Token required" });
//   }

//   try {
//     const decoded = jwt.verify(token, "secretkey");
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.json({ message: "Invalid token" });
//   }
// };

// module.exports = verifyToken;
// 🛡️ 6. ROLE BASED ACCESS (RBAC)
// const checkRole = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.json({ message: "Access Denied" });
//     }
//     next();
//   };
// };

// module.exports = checkRole;
// 👨‍💼 7. ADMIN API (PRISMA + RBAC)
// 📁 admin.routes.js
// const router = require("express").Router();

// const verifyToken = require("../middlewares/verifyToken");
// const checkRole = require("../middlewares/checkRole");
// const prisma = require("../config/prismaClient");

// // only admin can see all users
// router.get(
//   "/users",
//   verifyToken,
//   checkRole("admin"),
//   async (req, res) => {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   }
// );

// module.exports = router;
// 👤 8. USER PROFILE API
// router.get(
//   "/profile",
//   verifyToken,
//   async (req, res) => {
//     const user = await prisma.user.findUnique({
//       where: { id: req.user.id }
//     });

//     res.json(user);
//   }
// );
// ⚙️ 9. FLOW (VERY IMPORTANT)
// Frontend (React)
//       ↓
// JWT Token
//       ↓
// verifyToken
//       ↓
// req.user = decoded (id, role)
//       ↓
// checkRole("admin")
//       ↓
// Prisma DB Query
//       ↓
// Response → UI
//  SIMPLE UNDERSTANDING
// Layer	Work
// Prisma	Database handle
// Controller	Logic
// Middleware	Security
// Routes	URL
// JWT	Identity
//  REAL PROJECT TIP

//  Best practice:

// app.use("/admin", verifyToken, checkRole("admin"));
//  NEXT STEP (I recommend)

// Hu tamne aa bhi teach kari saku chu:

//  1. Full Admin Dashboard APIs (CRUD)
//  2. Trainer / Student separate modules
//  3. Refresh Token system (advanced security)
//  4. React Admin Dashboard integration

// Bas bolo 👍


//////////////////////////////////// full authentication flow (register → login → verify → role check)


////////////////////////////////full role based access//////////////////////////////////////////////////
// 1. Tame atyare shu kari rahya cho (current flow)

//  login controller ma tame JWT banavo cho:

// const token = jwt.sign({
//   id: user.id,
//   email: user.email
// }, "secretkey")

//   PROBLEM:

// role include nathi
// etle system ne khabar j nathi ke admin kon / user kon
//  2. RBAC mate tamare 4 MAIN changes karva padshe
//  STEP 1: DATABASE (Prisma) CHANGE

//  schema.prisma ma role add karo

// model User {
//   id       Int    @id @default(autoincrement())
//   email    String @unique
//   password String
//   role     String @default("student")  // ⭐ ADD THIS
// }
//  WHY?

//  system ne samjavu pade:

// admin?
// student?
// trainer?
//  STEP 2: REGISTER MA role store karo
// usermodel.js / register function
// await prisma.user.create({
//   data: {
//     email: data.email,
//     password: hashedPassword,
//     role: data.role || "student"
//   }
// });
//  WHY?

//  user banse tyare role set thase

//  STEP 3: LOGIN MA ROLE ADD KARO (VERY IMPORTANT )

//  tamaru login controller change karvu padse:

//  current:
// id: user.id,
// email: user.email
//  correct:
// const token = jwt.sign({
//   id: user.id,
//   email: user.email,
//   role: user.role   // ⭐ ADD THIS
// }, "secretkey", { expiresIn: "1h" });
//  WHY?

//  frontend + middleware ne khabar pade:
// “aa admin che ke student”

//  STEP 4: VERIFY TOKEN MIDDLEWARE

//  middleware ma aa add karvu:

// req.user = decoded;

//  etle:

// req.user.role
// req.user.id

// available thai jase

//  WHY?

//  next routes ma use karva mate

//  STEP 5: ROLE CHECK MIDDLEWARE (NEW FILE )

// 📁 middleware/auth.js (or new file)

// const checkRole = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.json({
//         message: "Access denied"
//       });
//     }
//     next();
//   };
// };

// module.exports = checkRole;
//  WHY?

//  control kare:

// admin only routes
// student only routes
//  STEP 6: ROUTES MA USE KARO
// 👑 ADMIN ONLY
// router.get(
//   "/all-users",
//   verifyToken,
//   checkRole("admin"),
//   controller.getAllUsers
// );
// 👨‍🎓 ADMIN + TRAINER
// checkRole("admin", "trainer")
// 👤 USER PROFILE (ANY LOGIN USER)
// verifyToken,
// controller.myProfile
//  FINAL FLOW (VERY IMPORTANT)
// Login
//   ↓
// JWT (id + email + role)
//   ↓
// verifyToken → req.user
//   ↓
// checkRole("admin")
//   ↓
// Allow / Deny
//  REAL EXAMPLE (your project)
//  Fitness / Student system:
// Role	Access
// Admin	full control
// Trainer	students + attendance
// Student	only own data
//  COMMON MISTAKE (tame avoid karjo)

//  role DB ma nathi
//  JWT ma role nathi
//  middleware nathi
//  direct controller ma check karvu

//  IF YOU WANT NEXT LEVEL

// Hu tamne aa pan build kari aapu:

//  Admin Dashboard API structure
//  Trainer module (real system)
//  React role-based UI hide/show buttons
//  Full project architecture diagram