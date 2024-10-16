-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DISABLED', 'ENABLED', 'PAUSED');

-- CreateTable
CREATE TABLE "bot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "created" BIGINT NOT NULL,

    CONSTRAINT "bot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bot" TEXT NOT NULL,
    "created" BIGINT NOT NULL,

    CONSTRAINT "worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "bot" TEXT NOT NULL,
    "worker" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);
