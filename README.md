# Bank-backend-mongo
# My Bank App - Backend

This backend application manages users and transactions for a banking system.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/Bank-backend-mongo.git
    ```

2. **Install dependencies:**

    ```bash
    cd my-bank-app-backend
    npm install
    ```

3. **Set up environment variables:**

    - Create a `.env` file in the root directory.
    - Define the following variables:

        ```env
        PORT=8080
        DB=your mongo link
        ```

4. **Start the server:**

    ```bash
    npm start
    ```

## API Endpoints

### Users

- `POST /api/users`: Create a new user.
- `GET /api/users/:id`: Get details of a specific user.
- `GET /api/users`: Get details of all users.
- `PUT /api/users/:id`: Update user details.
- `DELETE /api/users/:id`: Delete a user.

### Transactions

- `POST /api/transactions/deposit`: Deposit cash for a user.
- `POST /api/transactions/update-credit`: Update credit for a user.
- `POST /api/transactions/withdraw`: Withdraw cash for a user.
- `POST /api/transactions/transfer`: Transfer money between users.
- `GET /api/transactions/user/:id`: Get transaction history of a user.

## Technologies Used

- Node.js
- Express
- MongoDB (Mongoose)
- Other dependencies as listed in `package.json`
