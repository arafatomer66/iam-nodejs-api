Identity and Access Management API

A Node.js-based application designed to manage users, roles, entitlements, and their relationships in Identity and Access Management (IAM) systems. This API is built to integrate seamlessly with SailPoint IdentityIQ using web service connectors.
Features

    Manage users, roles, entitlements, and their mappings.
    Import and synchronize data with external IAM systems like SailPoint IdentityIQ.
    Support for CRUD operations on:
        Users
        Roles
        Entitlements
        User-Role and User-Entitlement relationships
    RESTful APIs to handle role-based access and provisioning workflows.
    Scalable and modular architecture.

API Endpoints
Users

    GET /users - Fetch all users.
    POST /users - Create a new user.
    GET /users/:id - Fetch a user by ID.
    PUT /users/:id - Update user details.
    DELETE /users/:id - Delete a user.

Roles

    GET /roles - Fetch all roles.
    POST /roles - Create a new role.
    GET /roles/:id - Fetch a role by ID.
    PUT /roles/:id - Update role details.
    DELETE /roles/:id - Delete a role.

Entitlements

    GET /entitlements - Fetch all entitlements.
    POST /entitlements - Create a new entitlement.
    GET /entitlements/:id - Fetch an entitlement by ID.
    PUT /entitlements/:id - Update entitlement details.
    DELETE /entitlements/:id - Delete an entitlement.

Mappings

    POST /assign-role - Assign roles and associated entitlements to a user.
    GET /user-entitlements/by-role/:roleId - Fetch user entitlements by role ID.
    GET /user-roles/by-user/:userId - Fetch roles assigned to a specific user.

Tech Stack

    Node.js: Backend runtime.
    Express.js: Web framework.
    Sequelize: ORM for database operations.
    MySQL/PostgreSQL: Relational database.
    Docker: For containerization (optional).

Getting Started
Prerequisites

    Node.js (v14+)
    MySQL or PostgreSQL
    Docker (optional for deployment)

Setup

    Clone the repository:

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

Install dependencies:

npm install

Configure the database:

    Edit the config/config.js file to set your database credentials.

Run database migrations:

npx sequelize-cli db:migrate

Start the application:

    npm start

Testing

    Use Postman or curl to test API endpoints.
