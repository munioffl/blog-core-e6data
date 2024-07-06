# Blogging Platform

This is a blogging platform built with Node.js, Express, TypeScript, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Setup

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd blogging-platform
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=3000
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

4. Build the project:

    ```sh
    npm run build
    ```

5. Start the server:

    ```sh
    npm start
    ```

6. Open your browser and navigate to `http://localhost:3000/api-docs` to view the API documentation.

## Development

To start the server in development mode with hot-reloading:

```sh
npm run debug
```

Project Structure:

```
.env
.vscode/
    launch.json
package.json
src/
    app.ts
    controllers/
        authController.ts
        postController.ts
    middlewares/
        authMiddleware.ts
    models/
        post.ts
        user.ts
    routes/
        authRoutes.ts
        postRoutes.ts
    server.ts
    utils/
        statusCodes.ts
        swagger.ts
        swaggerDefinitions.ts
tsconfig.json
```

## Scripts
- npm start: Start the server.
- npm run debug: Start the server in development mode with hot-reloading.
- npm run build: Compile TypeScript files to JavaScript.


