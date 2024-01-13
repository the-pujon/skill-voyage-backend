# Skills Voyage Backend

## Project Overview

This is the backend codebase for a Skills Voyage

## Setup

1. Install dependencies: `npm install`
2. Start the server: `npm start` or `npm run dev` for development with nodemon.
3. The server will be running on `http://localhost:5000`.

## Project Structure

- `src/config/db.js`: MongoDB connection setup.
- `src/routes/`: Contains route handlers for different entities (users, instructors, classes, payments, categories).
- `src/controllers/`: Controllers for each entity's CRUD operations.
- `src/middlewares/auth.js`: Authentication and authorization middleware.
- `app.js`: Main application file with configuration and route setup.
- `package.json`: Project metadata and dependencies.

## Endpoints

### Users

- `POST /api/users`: Create a new user.
- `GET /api/users`: Get all users.
- `GET /api/users/:email`: Get a single user by email.
- `PUT /api/users/:email`: Update a user by email.
- `DELETE /api/users/:email`: Delete a user by email.
- `POST /api/users/jwt`: Get JWT token.

### Instructors

- `GET /api/instructors`: Get all instructors.
- `POST /api/instructors`: Add a new instructor.
- `GET /api/instructors/:email` or `GET /api/instructors/:id`: Get a single instructor by email or ID.
- `PUT /api/instructors/:email`: Update an instructor by email.
- `DELETE /api/instructors/:email`: Delete an instructor by email.

### Classes

- `GET /api/courses`: Get all classes.
- `POST /api/courses`: Create a new class (requires authentication instructor privileges).
- `GET /api/courses/:id`: Get a class by ID.
- `PUT /api/courses/:id`: Update a class by ID (requires admin privileges).
- `DELETE /api/courses/:id`: Delete a class by ID (requires admin privileges).
- `GET /api/courses/email/:email`: Get classes by instructor email.
- `GET /api/courses/category/:category`: Get classes by category.

### Payments

- `GET /api/payments`: Get all payments (requires admin privileges).
- `GET /api/payments/:email`: Get payments by user email (requires authentication).
- `POST /api/payments`: Create a new payment (requires authentication).

### Categories

- `POST /api/categories`: Create a new category (requires authentication and admin privileges).
- `GET /api/categories`: Get all categories.
- `GET /api/categories/:categoryId`: Get a category by ID.
- `PUT /api/categories/:categoryId`: Update a category by ID (requires authentication and admin privileges).
- `DELETE /api/categories/:categoryId`: Delete a category by ID (requires authentication and admin privileges).
- `POST /api/categories/:categoryId/subcategories`: Create a subcategory (requires authentication and admin privileges).
- `GET /api/categories/:categoryId/subcategories`: Get all subcategories of a category.
- `GET /api/categories/:categoryId/subcategories/:subcategoryId`: Get a subcategory by ID.
- `PUT /api/categories/:categoryId/subcategories/:subcategoryId`: Update a subcategory by ID (requires authentication and admin privileges).
- `DELETE /api/categories/:categoryId/subcategories/:subcategoryId`: Delete a subcategory by ID (requires authentication and admin privileges).

## Middleware

- `verifyJWT`: Verifies the JSON Web Token for authentication.
- `verifyAdmin`: Verifies if the user has admin privileges.
- `verifyInstructor`: Verifies if the user has instructor privileges.

## Webhooks

- The application listens for Stripe webhooks at `/webhook` for payment-related events.

## Payment Integration

- The application integrates with the Stripe API for handling payments.
- `POST /api/checkout`: Initiates the checkout process, calculates the total amount, and creates a Stripe Checkout session.

## Error Handling

- 404 Route Not Found: Returns a JSON response indicating the route is not found.
- 500 Server Error: Returns a JSON response for internal server errors.

## Scripts

- `npm start`: Starts the server.
- `npm run dev`: Starts the server with nodemon for development.

## Project Demo

Click [here](https://skills-voyage-elm.netlify.app/) to view the Skills Voyage project.

For Frontend, click [here](https://github.com/the-pujon/skill-voyage-frontend).

---

## Credentials

### Admin Login:

- **Email:** pujondasauvi@gmail.com
- **Password:** password123456789

### Instructor Login:

- **Email:** auvidas@gmail.com
- **Password:** password123456789

---

<div align="center">
  <a href="https://skills-voyage-elm.netlify.app/">Explore the Skills Voyage Platform</a>
</div>
