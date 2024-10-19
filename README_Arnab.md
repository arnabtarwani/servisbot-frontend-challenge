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

2. Start postgres using docker.

```bash
docker-compose up -d
```

3. Install the dependencies.

```bash
pnpm install
```

**NOTE**: There is a postinstall script that will run the migrations and generate the Prisma client and also seed the database. If you want to run the migrations and generate the Prisma client manually, then you can run the following commands:

```bash
pnpm backend db:migrate && pnpm backend db:generate
make seed-db
```

`make seed-db` will run the insert.sql file to seed the database. Check more on this [here](#database)

5. Copy the `.env.example` file to `.env` and update the environment variables and create a symlink in the `backend` repo for Prisma (ORM)

```bash
cp .env.example .env
cd packages/backend &&  ln -s ../../.env .env
cd ../..
```

6. Start the development server. This will start the frontend and backend server concurrently.

```bash
pnpm dev
```

### Backend

The backend server is using fastify for the backend server and Prisma for the ORM. The server has 4 routes:

1. `/bots` - To get all the bots.
2. `/workers/:botId` - To get all workers by botId.
3. `/logs/:botId` - To get all logs by botId.
4. `/logs/:botId/:workerId` - To get all logs for worker by botId and workerId.

The backend server is running on `http://localhost:4000` and can be tested using the following curl commands:

```bash
curl -X GET http://localhost:4000/bots
curl -X GET http://localhost:4000/workers/Bot%20One # Essentially the bot Id should be passed here but the worker table has bot name as the foreign key
curl -X GET http://localhost:4000/logs/${botId}
curl -X GET http://localhost:4000/logs/${botId}/${workerId}
```

### Frontend

The frontend is a Vite app that is using React and TailwindCSS. The frontend is running on `http://localhost:3000`. The frontend has 3 pages:

- `/` - Home page that lists all the bots.
- `/bots/:botId` - Page that lists all the logs and workers for a bot.
  - when you land on this page, you will see the logs for the bot.
  - You can click on the worker name to see the logs for that worker.
- `/logs/:botId/:workerId` - Page that lists all the logs for a worker.

The frontend is using the following libraries:

- `tailwindcss` - For styling.
- `react-router-dom` - For routing.
- `@tanstack/table` - For the table component.
- `zustand` - For state management.
- `dayjs` - For date formatting.
- `lucide-react` - For icons.

The frontend is using the following folder structure:

- `components` - Contains all the components.
- `pages` - Contains all the pages.
- `store` - Contains the zustand store.
- `utils` - Contains the utility functions.
- `styles` - Contains the global styles.

### Database

I am using Prisma to handle DB migrations. Prisma doesn't handle INSERT queries in the migrations so to seed the database there are two options:

1. Use Prisma Client to seed the database.
2. Use a separate script to seed the database.

You can use either of the two options to seed the database. I have used the second option to seed the database. The script is located at `packages/backend/prisma/insert.sql`. This script is run using makefile and the command is `make seed-db`. You need to ensure that the `HOST`, `USER`, `PASSWORD`, and `DB_NAME` are set in the `.env` file.

### Some Design Decisions

#### Why Makefile?

- Makefile is a simple way to run commands.
- It is easy to use and understand.
- It is a good way to run multiple commands in a sequence.

**NOTE**: If you go with the first option, then after the postinstall script, you can run `pnpm backend db:seed` to seed the database.

#### Why Prisma?

- Prisma is a modern ORM that is easy to use.
- It generates types for the database schema.
- It has a powerful query API.
- It has a powerful migration system.

#### Why pnpm?

I am using `pnpm` as the package manager which is a faster and more performant version of npm. It also has a better monorepo support. With pnpm, the dependencies are hoisted to the root node_modules folder and the symlinks are created for the packages. This makes the installation faster and the disk space is also reduced.

### Future Improvements

- Add tests for the frontend and backend. Currently, there are no tests. The tests can be added using Jest and React Testing Library for the frontend and Jest for the backend.
- Add pagination for the logs. Currently the UI pagination is implemented however, the API is not paginated.
- Add search functionality for the logs.
- Use react-query for data fetching in the frontend. This will make the data fetching more efficient. Currently, I am using the fetch API to fetch the data.
- Deployment can be done using AWS or GCP. The frontend can be deployed to S3 and the backend can be deployed to Elastic Beanstalk or Cloud Run. If you want to use serverless, then you can use Lambda for the backend. You can also use Vercel for the frontend and backend.
- Add authentication and authorization for the backend. Currently, there is no authentication and authorization implemented. You can use JWT for authentication and authorization.
- Add error handling for the frontend and backend. Currently, there is no error handling implemented. You can use react-error-boundary for the frontend and fastify-error-handler for the backend.
- Add loading states for the frontend. Currently, there is no loading state implemented except for when the data is being fetched. You can use react-loading-skeleton for the loading state.
