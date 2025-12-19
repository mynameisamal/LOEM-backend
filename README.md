# LOEM Gallery, Coffee & Roastery – Backend API
Backend REST API for LOEM Gallery, Coffee & Roastery, a mobile-first coffee delivery application.
This repository contains backend-only implementation.
Frontend and mobile UI are intentionally excluded.


# FEATURES
Core:
- JWT-based authentication
- Role-based access control (customer and admin)
- Standardized API response format
- Modular and scalable architecture
Business Logic:
- Delivery-only order flow
- Persistent shopping cart per user
- Voucher and discount validation
- Backend-controlled pricing and delivery fee
- Admin-managed order status lifecycle


# TECH STACK
- Node.js
- Express.js
- MySQL
- JSON Web Token (JWT)
- bcrypt (password hashing)
- Joi (request validation)
- Multer (file upload)
- dotenv (environment variables)


# PROJECT STRUCTURE
src/
 ├─ app.js
 ├─ config/
 │  ├─ db.js
 │  └─ env.js
 ├─ modules/
 │  ├─ auth/
 │  ├─ users/
 │  ├─ products/
 │  ├─ carts/
 │  ├─ orders/
 │  └─ vouchers/
 ├─ middlewares/
 │  ├─ authMiddleware.js
 │  └─ roleMiddleware.js
 ├─ routes/
 └─ utils/
server.js
Each module is isolated to keep the codebase clean, maintainable, and production-ready.


# USER ROLES
- Customer
- Admin
Admin-only endpoints are protected using role-based authorization middleware.


# ORDER STATUS FLOW
pending -> accepted -> brewing -> on_delivery -> completed
                     -> cancelled
Order status updates can only be performed by admin users.


# DATABASE OVERVIEW
Main tables used in this project:
- users
- addresses
- categories
- products
- product_variants
- carts
- cart_items
- vouchers
- orders
- order_items
All price calculations (subtotal, discount, delivery fee, total price)
are handled exclusively in the backend.


# API RESPONSE STANDARD
Success response:
{
  "success": true,
  "message": "string",
  "data": {}
}

Error response:
{
  "success": false,
  "message": "error message"
}


# GETTING STARTED
1. Install dependencies
npm install
2. Configure environment variables
Create a .env file in the project root:
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=loem_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
3. Run development server
npm run dev
4. Health check
GET http://localhost:4000/health


# DEVELOPMENT STATUS
This project is currently under active development.
Features are implemented incrementally following real-world backend practices.


# AUTHOR
Charity (Satria Amal Samosir)
Backend Software Engineer
Specializing in Node.js, REST APIs, and scalable backend systems.


LICENSE

MIT License