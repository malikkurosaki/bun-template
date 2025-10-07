# Full-Stack Template: Bun, ElysiaJS, React, and Prisma

This is a comprehensive full-stack application template built with a modern JavaScript toolchain. It provides a solid foundation for building fast, type-safe web applications.

## ✨ Features & Tech Stack

- **Runtime & Bundler**: [Bun](https://bun.sh/) - An incredibly fast all-in-one JavaScript runtime.
- **Backend Framework**: [ElysiaJS](https://elysiajs.com/) - A fast, ergonomic, and type-safe backend framework for Bun.
- **Frontend Library**: [React](https://react.dev/) - A popular library for building user interfaces.
- **UI Components**: [Mantine](https://mantine.dev/) - A full-featured React component library.
- **Database ORM**: [Prisma](https://www.prisma.io/) - A next-generation Node.js and TypeScript ORM.
- **Type-Safe Client**: [Eden](https://elysiajs.com/plugins/eden.html) - Creates a type-safe client from your ElysiaJS API to be used in the frontend.
- **API Documentation**: [Swagger](https://elysiajs.com/plugins/swagger.html) - Automatically generated API documentation.
- **Authentication**: JWT-based authentication middleware is included.

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have [Bun](https://bun.sh/docs/installation) installed on your system.

### 2. Clone the Repository

```bash
git clone <repository-url>
cd bun-template
```

### 3. Install Dependencies

```bash
bun install
```

### 4. Set Up Environment Variables

Copy the example environment file and update it with your own configuration.

```bash
cp .env.example .env
```

You will need to configure the following variables in the `.env` file:

- `DATABASE_URL`: Your PostgreSQL connection string.
- `JWT_SECRET`: A secret key for signing JWTs.
- `BUN_PUBLIC_BASE_URL`: The public base URL of your application (e.g., `http://localhost:3000`).
- `PORT`: The port the server will run on.

### 5. Set Up the Database

Run the Prisma migration to create the database schema. This will also apply any pending migrations.

```bash
bunx prisma migrate dev
```

### 6. Seed the Database (Optional)

You can seed the database with initial data using the provided seed script.

```bash
bunx prisma db seed
```

## 📜 Available Scripts

- **`bun dev`**: Starts the development server for both the backend and frontend with hot-reloading. The server runs on the port specified in your `.env` file (defaults to 3000).

- **`bun build`**: Builds the React frontend for production. The output is placed in the `dist/` directory.

- **`bun start`**: Starts the application in production mode. Make sure you have run `bun build` first.

## 📂 Project Structure

```
.
├── prisma/             # Prisma schema, migrations, and seed script
├── src/
│   ├── components/     # Shared React components
│   ├── lib/            # Shared library functions (e.g., apiFetch)
│   ├── pages/          # React components for different pages/routes
│   ├── server/         # ElysiaJS backend code (routes, middlewares)
│   ├── App.tsx         # Main React App component
│   ├── frontend.tsx    # Frontend entry point (client-side)
│   ├── index.css       # Global styles
│   ├── index.html      # HTML template for the frontend
│   └── index.tsx       # Main application entry point (server-side)
└── ...
```