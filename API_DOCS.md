LOEM Gallery, Coffee & Roastery – Backend API Documentation

Base URL:
http://localhost:4000/api

All protected endpoints require the following HTTP header:
Authorization: Bearer <JWT_TOKEN>


====================
AUTHENTICATION
====================

Register
POST /auth/register

Request body:
{
  "name": "User Name",
  "email": "user@mail.com",
  "phone": "08123456789",
  "password": "secret123"
}

Response:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": 1,
    "name": "User Name",
    "email": "user@mail.com",
    "phone": "08123456789"
  }
}


Login
POST /auth/login

Request body:
{
  "email": "user@mail.com",
  "password": "secret123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": 1,
      "name": "User Name",
      "email": "user@mail.com",
      "role": "customer"
    }
  }
}


====================
USER PROFILE
====================

Get user profile
GET /users/profile

Response:
{
  "success": true,
  "message": "User profile retrieved",
  "data": {
    "id": 1,
    "name": "User Name",
    "email": "user@mail.com",
    "phone": "08123456789",
    "role": "customer",
    "created_at": "2025-01-01T10:00:00Z"
  }
}


Update user profile
PUT /users/profile

Request body:
{
  "name": "Updated Name",
  "phone": "0899999999"
}


====================
ADDRESSES
====================

Create address
POST /addresses

Request body:
{
  "label": "Home",
  "detail_address": "Jl. Kopi No. 12, Jakarta",
  "lat": -6.200000,
  "lng": 106.816666
}


Get addresses
GET /addresses


Update address
PUT /addresses/:id

Request body:
{
  "label": "Office",
  "detail_address": "Jl. Sudirman No. 1",
  "lat": -6.210000,
  "lng": 106.820000
}


Delete address
DELETE /addresses/:id


====================
CATEGORIES & PRODUCTS (PUBLIC)
====================

Get categories
GET /categories


Get products
GET /products

Query parameters:
page   (optional, default: 1)
limit  (optional, default: 10)


Get product detail
GET /products/:id


====================
CART
====================

Get cart
GET /cart


Add item to cart
POST /cart/items

Request body:
{
  "product_id": 1,
  "qty": 2,
  "notes": "Less sugar"
}


Update cart item
PUT /cart/items/:id

Request body:
{
  "qty": 3,
  "notes": "No ice"
}


Remove cart item
DELETE /cart/items/:id


====================
ORDERS
====================

Create order (Checkout)
POST /orders

Request body:
{
  "address_id": 1,
  "voucher_code": "LOEM10"
}


Get user orders
GET /orders


Get order detail
GET /orders/:id


====================
VOUCHERS
====================

Validate voucher
POST /vouchers/validate

Request body:
{
  "code": "LOEM10",
  "subtotal": 100000
}

Response:
{
  "success": true,
  "message": "Voucher valid",
  "data": {
    "voucher_id": 1,
    "code": "LOEM10",
    "discount": 10000
  }
}


====================
ADMIN ORDERS (ADMIN ONLY)
====================

Get all orders
GET /admin/orders


Update order status
PUT /admin/orders/:id/status

Request body:
{
  "status": "brewing"
}

Valid status values:
- pending
- accepted
- brewing
- on_delivery
- completed
- cancelled


====================
API RESPONSE FORMAT
====================

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
