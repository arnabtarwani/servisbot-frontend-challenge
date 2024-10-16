ifneq (,$(wildcard ./.env))
    include .env
    export
endif

.PHONY: 
seed-db:
	docker exec -it servis-bot-challenge PGPASSWORD=${DB_PASSWORD} psql -h ${DB_HOST} -d ${DB_NAME} -U ${DB_USER} < ./packages/backend/prisma/insert.sql