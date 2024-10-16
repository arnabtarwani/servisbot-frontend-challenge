## ServisBot Task (Bot & Worker Logs)

## Requirements

- Node.js
- pnpm
- Docker
- Makefile

## Database

I am using Prisma to handle DB migrations. Prisma doesn't handle INSERT queries in the migrations so to seed the database there are two options:

1. Use Prisma Client to seed the database.
2. Use a separate script to seed the database.

You can use either of the two options to seed the database. I have used the second option to seed the database. The script is located at `packages/backend/prisma/insert.sql`. This script is run using makefile and the command is `make seed-db`. You need to ensure that the `HOST`, `USER`, `PASSWORD`, and `DB_NAME` are set in the `.env` file.

Why Makefile?

- Makefile is a simple way to run commands.
- It is easy to use and understand.
- It is a good way to run multiple commands in a sequence.

**NOTE**: If you go with the first option, then after the postinstall script, you can run `pnpm backend db:seed` to seed the database.
