<div align="center">
  <img src="https://github.com/user-attachments/assets/ca432d2d-09a0-40f8-a043-bdbbae85b4c6" width="150"/>
    <h1 id="title">EBazar</h1>
    <p><strong> A Fullstack E-commerce Application</strong></p>
    <p>
      <a href="https://ebazar-a2pa.onrender.com">View Website</a> •
      <a href="https://documenter.getpostman.com/view/33572999/2sAY547K4U">View API Documentation</a>
    </p>
    <img src="https://github.com/user-attachments/assets/b1351b33-b68d-457f-b7c8-bc020adfba2d" width="700"/>
</div>

## Table of Contents


1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features Overview](#features-overview)
4. [Getting Started](#getting-started)
5. [Technical Architecture](#technical-architecture)
   1. [Components](#components)
   2. [Design Pattern](#design-pattern)
   3. [Deployment Architecture](#deployment-architecture)
   4. [Security](#security)
6. [Features in Detail](#features-in-detail)
7. [Potential Improvements](#potential-improvements)

## Project Overview

<p id="description">EBazar is a full-stack E-commerce application built with the MERN stack, offering a complete online shopping experience. Users can browse products, securely purchase items, and manage their orders and account details, while admins can track orders and manage inventory effectively.</p>

## Tech Stack

- ### Frontend

  - **React**
  - **React Router**
  - **Redux**
  - **Material UI**
  - **Tailwind CSS**

- ### Backend

  - **Node.js**
  - **Express.js**
  - **MongoDB & Mongoose**
  - **Passport.js**
  - **Stripe**
  - **Jest**
  - **Joi**
  - **Nodemailer**

## Features Overview

- Authentication
  - User and Admin registration and authentication with JWT tokens.
  - Secure API endpoints with Passport-based token-based authentication.
  - OTP based Password recovery via email
- User Features
  - Product Management - View products, add to wishlist, add to cart.
  - Cart Management - Update or remove cart items
  - Checkout & Payments - Proceed to checkout, add/update address, process payments using Stripe.
  - Order Management - View orders and order history.
- Admin Features
  - Product Management - Add, update, delete, and view products.
  - Order Management: Manage user orders.
- API Routes and Documentation
  - Created RESTful API routes and documented them in Postman 


## Getting Started

### 1. Setup and Installation

- **Clone the Repository**

  ```bash
  git clone https://github.com/Anusree6154s/ebazar.git
  cd ebazar
  ```

- **Set Up Environment Variables**

  - Create a `.env` file in the root directory and add the following variables:

    ```bash
    MONGODB_URL=your_mongodb_uri  # MongoDB connection URI
    MONGODB_URL_TEST=your_test_mongodb_uri  # MongoDB URI for testing

    JWT_SECRET_KEY=your_jwt_secret_key  # Secret key for JWT authentication
    SESSION_SECRET=your_session_secret  # Secret key for session management

    SENDERS_GMAIL=your_sender_email@gmail.com  # Sender's Gmail address
    SENDERS_GMAIL_APP_PASSWORD=your_app_password  # App-specific password for Gmail

    STRIPE_SECRET_KEY=your_stripe_secret_key  # Stripe secret key for payment processing

    PORT=your_desired_backend_port  # Example: 8080

    ```

- **Install Dependencies**

  ```bash
  cd server
  npm install
  ```

### 2. Usage

Follow the bellow commands to run the app

```bash
npm build #(optional - only if you make chanegs to the client)
npm start
```

This will start both the **backend** and **frontend**:

- **Frontend**: `http://localhost:8080`
- **Backend**: `http://localhost:8080/api` (or your specified port)

Now both servers should be running and accessible on their respective URLs.

### 3. Testing

To test the backend, run:

```bash
npm test
```

## Technical Architecture

### Components

- **Frontend**

  - **React**: Provides a component-based architecture for building efficient, dynamic user interfaces.
  - **React Router DOM**: Enables client-side routing, improving the navigation experience without page reloads.
  - **Redux**: Manages global state across the app, ensuring consistency and simplifying data flow.
  - **Material UI (MUI)**: Offers pre-built, customizable components for fast development and responsive design.
  - **Tailwind CSS**: A utility-first CSS framework that allows flexible and custom designs with minimal effort.
  - **Stripe**: A trusted, secure payment gateway for processing transactions smoothly and safely.

- **Backend**

  - **Node.js**: A fast, non-blocking runtime that supports high concurrency and scalability for handling numerous requests.
  - **Express.js**: A lightweight framework for building RESTful APIs quickly and efficiently.
  - **MongoDB**: A flexible NoSQL database, ideal for handling unstructured data and scaling with ease.
  - **Mongoose**: An ODM that simplifies data interaction and validation with MongoDB.
  - **Passport.js**: Provides flexible, secure authentication mechanisms (e.g., JWT, OAuth) for managing user sessions.
  - **Stripe**: Integrated for secure payment processing, offering reliability and ease of use.
  - **Cookie-Parser**: Parses cookies for managing sessions and authentication securely.
  - **Cors**: Handles cross-origin requests, enabling safe communication between the frontend and backend across different domains.
  - **Joi**: A robust validation library for ensuring data integrity and security in incoming requests.
  - **Nodemailer**: Facilitates reliable email communication (e.g., password resets) with easy integration.
  - **Dotenv**: Safely manages environment variables to keep sensitive data secure.

### Design Pattern

- **Layered Architecture**: Clean separation of concerns in the backend (controllers, services, and data access).

### Deployment Architecture

- **Hosting**: Deployed on Render.
- **Server**: Node.js server handles API requests and responses.

### Security

- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Passport.js**: Handles user authentication strategies.
- **Password Hashing**: User passwords are securely hashed using bcrypt.

## Features in Detail

### Authentication

- **Registration** – New users and admins can securely create an account on Ebazar using their email and password.
- **Login** – Users and admins log in with their registered email and password for access to respective features.

- **Password Reset** – If a user or admin forgets their password, they can reset it through OTP-based email verification. A 4-digit OTP is sent via Nodemailer and expires within 5 minutes. Once verified, the user can set a new password.

- **Password Encryption** – Passwords are securely hashed using bcrypt, ensuring privacy and protection against unauthorized access.

- **Authentication Security** – User authentication is managed with PassportJS and JWT tokens. Tokens are generated upon login, stored in cookies with "SameSite" settings to prevent cross-origin requests, and reduce CSRF risks.

### User Features

- **Product Management**

  - **View Products and Details** – Users can explore a catalog displaying product names, prices, ratings, and images. Detailed information is accessible upon clicking a product.
  - **Add to Wishlist** – Users can save products to a wishlist for easy access and future purchase.
  - **Add to Cart** – Users can add products to their shopping cart.
  - **Buy Now** – Users can instantly purchase a product without adding it to the cart.

- **Cart Management**

  - **Update Cart Items** – Users can adjust product quantities in the cart.
  - **Remove Cart Items** – Users can delete items from the cart before purchase.

- **Checkout & Payments**

  - **Proceed to Checkout** – Users can review their order, including products, quantities, and total cost, before completing the purchase.
  - **Add/Update Address** – Users can add a new shipping address or update an existing one for accurate delivery.
  - **Process Payments using Stripe** – Payments are securely processed using Stripe's encrypted gateway. (Test version card details for this setup:
    - **Card Number**: 4242 4242 4242 4242
    - **Expiry Date**: Any future date
    - **CVC**: 424
    - **Country**: Any country)

- **Order Management**
  - **View Orders** – Users can access their past orders to track status and view details.

### Admin Features

- **Product Management**

  - **Add Products** – Admins can add new products, including details like name, price, and description.
  - **Update Products** – Admins can modify existing products, adjusting attributes like price, stock, or description.
  - **Delete Products** – Admins can remove products from the catalog if they are discontinued or unavailable.

- **Order Management**
  - **Manage User Orders** – Admins can update order statuses (e.g., pending, shipped, delivered) to keep users informed.

### API Documentation

- **Postman API Documentation** – [Access API documentation on Postman](https://documenter.getpostman.com/view/33572999/2sAY547K4U) for detailed endpoint information, request formats, and response examples.

## Potential Improvements

- **Two-Factor Authentication (2FA):** Add SMS or email-based 2FA for both users and admins to enhance login security.
- **Rate Limiting and Captchas:** Implement rate limiting and captchas to prevent brute-force attacks and bot abuse on login and signup endpoints.
- **Lazy Loading and Caching:** Use lazy loading for images and API response caching to improve page load times and performance.
- **Automated Testing:** Set up automated tests for front-end and back-end components to ensure application reliability and reduce bugs.

## Todo
- [ ] modularise files
- [ ] setup add to cart before login
  - [ ] store logged out user data in indexed db
  - [ ] upon log in transfar any indexeddb data to cart. clear indexed db
- [ ] setup add to wishlist before login
  - [ ] store logged out user data in indexed db
  - [ ] upon log in transfar any indexeddb data to wishlist. clear indexed db
- [ ] add advanced mongodb queries and optimisation
- [ ] ask gpt what else to add. what are the best practises to follow for frontennd and backend. security practises, optiisation, modularisation, cicd, ratelimiting, scaling
- [ ] add a welcome banner
- [ ] sort button not working
- [ ] fix the naimation on the outline of the prodict cards while changing theme
- [ ] providing your own ErrorBoundary or errorElement prop on your route.
- [ ] provide error handling for all forms
- [ ] erro boundary or error element prop


<p align="center"> 
 <img width="0" id="image" src="https://github.com/user-attachments/assets/7558c916-e7df-4c9d-aa39-92d3e48f8f2d" >
</p>
