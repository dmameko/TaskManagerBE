# Todo App Backend README

## Prerequisites

- Node.js (v12 or higher)
- npm (Node package manager)

## MongoDB Installation

### Step 1: Download MongoDB

1. Go to the [MongoDB Download Center](https://www.mongodb.com/try/download/community).
2. Select your operating system (Windows, macOS, or Linux).
3. Choose the latest stable release of MongoDB Community Server.
4. Download the installer and follow the installation instructions for your operating system.

### Step 2: Install `mongosh`

MongoDB version 8.0 and later does not include the `mongo` shell by default. Instead, you need to install `mongosh` (MongoDB Shell).

1. Visit the [MongoDB Shell Download Page](https://www.mongodb.com/try/download/shell).
2. Select your operating system and download the installer.
3. Follow the installation instructions for your OS to complete the installation.

### Step 3: Start MongoDB

1. Open a terminal or command prompt.
2. Run the following command to start the MongoDB server:
   mongod --port 9000
   
### Step 4: Creating a Database and Collection

1. Open a new terminal or command prompt.
2. Start mongosh by running:
   mongosh --port 9000
3. Create new database by running:
   use todo-app
4. Create two collections named 'users; and 'todos':
   db.createCollection('users')
   db.createCollection('todos')

### Step 5: Start BE server

1. Install all dependencies.
2. Run server with command:
   node server.js
