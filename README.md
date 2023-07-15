# Node.js, Express.js, and MySQL CRUD Application with Authentication and Authorization

This is a sample Node.js application that demonstrates a CRUD (Create, Read, Update, Delete) operation with MySQL database. The application includes user authentication and authorization, with two different roles: customer and admin.

## Features

- User registration and login with email and password.
- Access tokens are used for authentication and authorization.
- Two user roles: customer and admin.
- Customers can view products and admin can perform all CRUD operations on products and customers.
- Admin can also change user roles.

## Folder Structure

The application follows the following folder structure:

- app
  - controllers
    - authController.js
    - customerController.js
    - productController.js
    - userController.js
  - models
    - customer.js
    - product.js
    - user.js
  - routes
    - authRoutes.js
    - customerRoutes.js
    - productRoutes.js
    - userRoutes.js
  - middlewares
    - authMiddleware.js
  - utils
    - database.js
    - roles.js
- config
  - db.config.js
- server.js


## Requirements

To run this application, you need the following:

- Node.js and npm installed on your machine.
- MySQL database set up and running.
- Environment variables for the access token secret and other sensitive information (you can use a .env file).

## Installation

1. Clone the repository or download the source code.

2. Install the dependencies:

```
npm install
```


3. Configure the database connection in `config/db.config.js` file.

4. Set up the environment variables (e.g., ACCESS_TOKEN_SECRET) in a .env file at the root of the project.

## Database Setup

1. Create a MySQL database and configure the connection in `config/db.config.js`.

2. Create the necessary tables and insert dummy data. You can find the SQL queries in the previous section of the README.

## Usage

To start the application, run the following command:

```
npm start
```


The server will start running on port 3000 by default. You can access the API endpoints using tools like Postman or curl.

## API Endpoints

- **POST /api/auth/register**: Register a new user with email and password.
- **POST /api/auth/login**: Login a user with email and password and get an access token.
- **GET /api/auth/profile**: Get the user profile with valid access token.

- **GET /api/customers**: Get all customers (admin only).
- **POST /api/customers**: Create a new customer (admin only).
- **PUT /api/customers/:id**: Update a customer by ID (admin only).
- **DELETE /api/customers/:id**: Delete a customer by ID (admin only).

- **GET /api/products**: Get all products.
- **POST /api/products**: Create a new product (admin only).
- **PUT /api/products/:id**: Update a product by ID (admin only).
- **DELETE /api/products/:id**: Delete a product by ID (admin only).

- **PUT /api/users/:id/role**: Update user role by ID (admin only).

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you want to contact me you can reach me at <a href="mailto:contact@pasanabeysekara.com">contact@pasanabeysekara.com</a>.</br>
Connect with me on [LinkedIn](https://www.linkedin.com/in/pasanabeysekara/).</br>
Visit my [web](https://pasanabeysekara.com).

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Postman](https://www.postman.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)