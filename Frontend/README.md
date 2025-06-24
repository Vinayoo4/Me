# 90s Personal Website (Vue 3 + TypeScript + Vite + Express)

## Project Structure

```
project/
  Backend/           # Express backend
    server/
      index.js
      data/
  Frontend/          # Vue 3 frontend
    src/
      main.ts
      App.vue
      Home.vue
      ...
  index.html         # Project root, entry for Vite
  package.json       # Project scripts and dependencies
```

## Setup Instructions

### 1. Install Dependencies

```sh
npm install
```

### 2. Environment Variables

Create a file at `Frontend/.env` with:
```
VITE_API_BASE=/api
```

### 3. Development

Start both frontend and backend together:
```sh
npm run dev
```
- Frontend: Runs on http://localhost:5173/
- Backend:  Runs on http://localhost:3001/

### 4. Build for Production

Build the frontend:
```sh
cd Frontend
npm run build
```
This outputs the production build to `Frontend/dist/`.

### 5. Deploy
- Serve the contents of `Frontend/dist/` as static files from your backend (Express).
- Ensure your backend proxies `/api` requests to the backend logic.
- Example (in `Backend/server/index.js`):
  ```js
  import express from 'express';
  import path from 'path';
  const app = express();
  // Serve static files
  app.use(express.static(path.join(__dirname, '../../Frontend/dist')));
  // ...your API routes...
  // Fallback to index.html for SPA
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/dist/index.html'));
  });
  ```

## Notes
- All API calls in the frontend use the environment variable `VITE_API_BASE`.
- Update `VITE_API_BASE` as needed for your deployment environment.
- For local development, the Vite dev server proxies `/api` to the backend.

## Contributing
Pull requests and issues are welcome!
