# Mini Personal Project

This is a mini project developed as part of an assignment, featuring RBAC (Role-Based Access Control) and token-based authentication.

## Description

The project provides a simple API for managing books and user authentication. It demonstrates how RBAC can be implemented to restrict access to certain endpoints based on user roles. Users can register, log in, and perform various actions depending on their role.

## Features

- User registration and authentication with JWT (JSON Web Tokens).
- Role-based access control (RBAC) for different user roles (e.g., admin, user).
- CRUD (Create, Read, Update, Delete) operations for books.
- Secure access to certain endpoints based on user roles.

## Installation

1. Install project dependencies:

```
cd <mini-personal-project>
npm install
```

2. Start the server:

```
npm start
```

## Usage

### User Authentication

register a new user :
- endpoint : `/auth/register`
- method:POST
- Request body example:

```
{
  "username": "user1",
  "password": "password123",
  "role": "user"
}

```
Log in:

- Endpoint: `/auth/login`
- Method: POST
- Request body example:

```
{
  "username": "user1",
  "password": "password123"
}

```

### Books API

Get all books:

- Endpoint: `/books`
- Method: GET


Create a new book:
- Endpoint: `/books`
- Method: POST
- Request body example:
 ```
 {
  "title": "Book Title",
  "author": "Author Name",
  "status": "available"
}
 ```

 Update a book by ID:
 - Endpoint: `/books/{id}`
 - Method: PUT
 - Request body example (to update status):

 ```
 {
  "status": "available"
}
 ```

 Delete a book by ID:
 - Endpoint: `/books/{id}`
 - Method: DELETE

 Note: To access certain endpoints (e.g., create, update, delete books), you may need to include the JWT token in the `Authorization` header with the format `Bearer YOUR_JWT_TOKEN`.


