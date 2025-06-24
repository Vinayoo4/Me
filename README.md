# 90s Personal Website (Vue 3 + TypeScript + Vite + Express)

## Project Structure

The project is a monorepo with a `Frontend` and `Backend` directory.

-   **`Frontend/`**: Contains the Vue 3 application, managed by Vite.
-   **`Backend/`**: Contains the Express.js API server.
-   **`package.json`**: The single `package.json` at the root manages all dependencies and scripts.

## Setup & Running the Project

### 1. Install Dependencies

From the project root, run:

```sh
npm install
```

### 2. Set Up Environment Variables

Create a file at `Frontend/.env` and add the following line. This tells the frontend where to find the API.

```
VITE_API_BASE=/api
```

### 3. Run in Development

To start both the frontend and backend servers for development, run:

```sh
npm run dev
```

-   The **frontend** will be available at `http://localhost:5173`.
-   The **backend** API will be running at `http://localhost:3001`.
-   The Vite dev server will automatically proxy any requests from the frontend to `/api` over to the backend.

## Building for Production & Deployment

### 1. Build the Frontend

To create a production-ready build of the frontend, run:

```sh
npm run build
```

This will create a `dist` directory inside `Frontend/`.

### 2. Run the Production Server

To run just the backend server, which will also serve the built frontend files, use:

```sh
npm run server
```

The application will be available at `http://localhost:3001`. The Express server is already configured to serve the static files from `Frontend/dist` and handle client-side routing.

This is the command you would use in a production environment (e.g., on a cloud service). 