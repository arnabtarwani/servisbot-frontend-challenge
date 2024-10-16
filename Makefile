ifneq (,$(wildcard ./.env))
    include .env
    export
endif

.PHONY:
seed-db-docker:
	docker exec -i ${DB_CONTAINER_NAME} psql -U ${DB_USER} -d ${DB_NAME} < ./packages/backend/prisma/insert.sql

.PHONY: 
seed-db:
	PGPASSWORD=${DB_PASSWORD} psql -h ${DB_HOST} -d ${DB_NAME} -U ${DB_USER} < ./packages/backend/prisma/insert.sql