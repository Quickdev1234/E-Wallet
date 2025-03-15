# E-Wallet

A secure and user-friendly web application to manage your debit and credit card details, PAN card, driving license, and other important documents. This project is built using **React**, **Bun**, **Elysia**, and **MongoDB**.

---

## Features

- **User Authentication**:
  - Secure registration and login system.
  - Logout functionality.
  - Forgot password feature for account recovery.

- **Card and Document Management**:
  - Store and access debit/credit card details securely.
  - Add and manage PAN card, driving license, and other essential documents.
  - Data is stored securely with encryption.

- **Responsive Design**:
  - Optimized for various devices and browsers.

---

## Tech Stack

- **Frontend**: React
- **Backend**: Bun + Elysia
- **Database**: MongoDB
- **Hosting**: [E-Wallet Live App](https://e-wallet-1-client.onrender.com/)

---

## Installation and Setup

Follow these steps to set up the project locally:

### Prerequisites

1. [Node.js](https://nodejs.org/) (required for Bun installation)
2. [MongoDB](https://www.mongodb.com/) (local or cloud instance)
3. [Bun](https://bun.sh/) (for running and managing the project)
4. Git

**Install Bun:**
```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation (Linux & Windows)

#### 1. Clone the Repository
```bash
git clone https://github.com/Quickdev1234/E-Wallet.git
cd e-wallet
```

#### 2. Setup Backend (Server)
```bash
cd server
bun install   # Install dependencies
bun run dev   # Start the backend server
```

#### 3. Setup Frontend (Client)
```bash
cd ../client
bun install   # Install dependencies
bun run dev   # Start the frontend development server
```

#### 4. Running the Project
- The backend will run on `http://localhost:3000` (or the configured port in `.env`).
- The frontend will run on `http://localhost:5173`.

---

### Additional Notes
- Ensure MongoDB is running before starting the backend.
- Configure `.env` files for database and authentication settings.
- The project supports **secure storage** using encryption to keep user data safe.
- Both frontend and backend should be running simultaneously for full functionality.

Enjoy using **E-Wallet**! 🚀

