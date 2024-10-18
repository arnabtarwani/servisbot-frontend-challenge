## ServisBot Task (Bot & Worker Logs)

### Requirements

- Node.js
- pnpm
- Docker
- Makefile

## Setup

1. Clone the repo and navigate to the project directory.

```bash
git clone https://github.com/arnabtarwani/servisbot-frontend-challenge.git
cd servisbot-frontend-challenge
```

2. Install the dependencies.

```bash
pnpm install
```

3. Copy the `.env.example` file to `.env` and update the environment variables and create a symlink in the `backend` repo for Prisma (ORM)

```bash
cp .env.example .env
cd packages/backend &&  ln -s ../../.env .env
cd ../..
```

4. Start the development server.

```bash
pnpm dev # This will start the frontend and backend server concurrently.
```

### Backend

The backend server is using fastify for the backend

### Frontend

### Database

I am using Prisma to handle DB migrations. Prisma doesn't handle INSERT queries in the migrations so to seed the database there are two options:

1. Use Prisma Client to seed the database.
2. Use a separate script to seed the database.

You can use either of the two options to seed the database. I have used the second option to seed the database. The script is located at `packages/backend/prisma/insert.sql`. This script is run using makefile and the command is `make seed-db`. You need to ensure that the `HOST`, `USER`, `PASSWORD`, and `DB_NAME` are set in the `.env` file.

Why Makefile?

- Makefile is a simple way to run commands.
- It is easy to use and understand.
- It is a good way to run multiple commands in a sequence.

**NOTE**: If you go with the first option, then after the postinstall script, you can run `pnpm backend db:seed` to seed the database.

```

```
