# Ticket App

Modern and easy-to-use ticket management application. Built with Next.js, TypeScript, and PostgreSQL.

## Features

- User authentication (login, register, email verification)
- View and manage open tickets
- Archive and unarchive tickets
- User-specific ticket listing (my-tickets)
- Email notifications for ticket updates
- Admin panel for management

## Technologies

- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Prisma 6 ORM
- PostgreSQL 17
- Docker & Docker Compose

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Denizozaltay/TicketApp.git
   cd TicketApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the project root:

```env
BASE_URL="http://localhost:3000"

EMAIL_HOST=your_email_host
EMAIL_USER=your_email_user
EMAIL_PASSWORD=your_email_password

JWT_SECRET=your_jwt_secret

POSTGRES_DB_USER=your_postgres_db_user
POSTGRES_DB_PASSWORD=your_postgres_db_password
POSTGRES_DB_NAME=your_postgres_db_name
POSTGRES_DB_PORT=5432

DATABASE_URL="postgresql://${POSTGRES_DB_USER}:${POSTGRES_DB_PASSWORD}@ticket-db:5432/${POSTGRES_DB_NAME}"
```

## Running the Application

Start the application with Docker:

```bash
docker-compose up --build
```

Open `http://localhost:3000` in your browser.
