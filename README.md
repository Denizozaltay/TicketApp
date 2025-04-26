# Ticket App

Ticket management web application built with Next.js, TypeScript, Tailwind CSS, and Prisma.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Docker Setup](#docker-setup)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create new tickets
- List open tickets
- Archive and unarchive tickets
- View archived tickets

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Prisma 6 ORM
- PostgreSQL 17
- Docker & Docker Compose

## Prerequisites

- Node.js >=16
- npm or Yarn
- Docker & Docker Compose (optional for containerized setup)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-org>/ticket-app.git
   cd ticket-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# PostgreSQL database credentials
POSTGRES_DB_USER=your_username
POSTGRES_DB_PASSWORD=your_password
POSTGRES_DB_NAME=your_database
POSTGRES_DB_PORT=5432

# Prisma connection URL
DATABASE_URL=postgresql://${POSTGRES_DB_USER}:${POSTGRES_DB_PASSWORD}@localhost:${POSTGRES_DB_PORT}/${POSTGRES_DB_NAME}?schema=public
```

## Database Setup

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev --name init
```

You can also explore the database with Prisma Studio:

```bash
npx prisma studio
```

## Running the App

### Development

```bash
npm run dev
# or
 yarn dev
```

Open `http://localhost:3000` in your browser.

### Production

Build the app:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## API Endpoints

The application exposes the following REST API endpoints under `/api/tickets`:

- `GET /api/tickets` - List all open tickets
- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets/open` - List open tickets
- `GET /api/tickets/archived` - List archived tickets
- `GET /api/tickets/[id]` - Get ticket by ID
- `PUT /api/tickets/[id]` - Update ticket by ID
- `POST /api/tickets/[id]/archive` - Archive a ticket
- `POST /api/tickets/[id]/unarchive` - Unarchive a ticket

## Docker Setup

To run the app with Docker:

```bash
docker-compose up --build
```

This will start both the Next.js app and a PostgreSQL database.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
