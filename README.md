README.md
# Express Week 2 - Products API

## Overview
This is a fully functional RESTful API built with **Express.js** that allows CRUD operations on a `products` resource. It includes:
- Middleware for logging, authentication, and error handling.
- Filtering, pagination, and search.
- Stats endpoint to count products by category.

---

## Setup
### 1️⃣ Prerequisites
Install Node.js (v18+ recommended).

### 2️⃣ Install Dependencies   
```bash
npm install

### 3️⃣ Create Environment File

Copy .env.example to .env and set:

API_KEY=my-secret-api-key
PORT=3000

4️⃣ Run the Server
npm run dev
# or
npm start

API Endpoints
Method	Endpoint	Description
GET	/	Welcome message
GET	/api/products	List all products (supports category, search, pagination)
GET	/api/products/:id	Get single product
POST	/api/products	Create a new product
PUT	/api/products/:id	Update a product
DELETE	/api/products/:id	Delete a product
GET	/api/products/stats/count-by-category	Product counts by category
Example Request (POST)

POST /api/products
Header:
x-api-key: my-secret-api-key

Body:

{
  "name": "Headphones",
  "description": "Wireless over-ear",
  "price": 150,
  "category": "electronics",
  "inStock": true
}

Example Response
{
  "id": "some-uuid",
  "name": "Headphones",
  "description": "Wireless over-ear",
  "price": 150,
  "category": "electronics",
  "inStock": true
}

Authentication

All /api/* routes require a valid API key header:

x-api-key: my-secret-api-key


or

Authorization: Bearer my-secret-api-key

Submission

Push all project files to your GitHub Classroom repository.

Ensure .env.example is included, not .env.

Test all endpoints using Postman or Insomnia.