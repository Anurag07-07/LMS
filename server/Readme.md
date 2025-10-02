# LMS Server

This is the backend server for the LMS (Learning Management System) project, built with Node.js, Express, TypeScript, MongoDB, and Redis.

## Features

- REST API with Express
- MongoDB integration using Mongoose
- Redis caching with ioredis
- Environment variable configuration with dotenv
- CORS and cookie parsing support

## Project Structure

```
server/
  .env
  package.json
  tsconfig.json
  src/
    app.ts
    server.ts
    db/
      dbConnect.ts
      redis.ts
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas URI
- Redis URI (Upstash or similar)

### Installation

1. Clone the repository:

   ```sh
   git clone <your-repo-url>
   cd server
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Configure environment variables in `.env`:

   ```
   PORT=3000
   ORIGIN=[http://localhost:3000/]
   MONGO_URI=your_mongodb_uri
   REDIS_URI=your_redis_uri
   CLOUD_NAME=your_cloud_name
   CLOUD_API_KEY=your_cloud_api_key
   CLOUD_API_SECRET=your_cloud_api_secret
   ```

### Running the Server

- For development:

  ```sh
  npm run dev
  ```

- For production build:

  ```sh
  npm run build
  npm run start
  ```

The server will start on the port specified in your `.env` file.

### API Endpoints

- `GET /test` — Test endpoint to verify API is working.

## Code Overview

- [`src/app.ts`](src/app.ts): Express app setup, middleware, and routes.
- [`src/server.ts`](src/server.ts): Starts the server.
- [`src/db/dbConnect.ts`](src/db/dbConnect.ts): MongoDB connection logic.
- [`src/db/redis.ts`](src/db/redis.ts): Redis client setup.

## License

ISC

---

**Note:** Update the `.env` file with your actual credentials before running the server.