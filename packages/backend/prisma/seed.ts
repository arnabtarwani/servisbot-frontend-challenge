import { db } from "./index"
import { Status } from "@prisma/client"
import path from "path"
import bots from "../../../data/bots.json"
import workers from "../../../data/workers.json"
import logs from "../../../data/logs.json"

const seedDB = async () => {
    try {
        if (!Array.isArray(bots) || bots.length === 0 || !Array.isArray(workers) || workers.length === 0 || !Array.isArray(logs) || logs.length === 0) {
            console.error(`Invalid data for JSON path: ${path}`);
            console.error('Actual data:', { bots, workers, logs });
        }

        for (const item of bots) {
            try {
                await db.bot.createMany({
                    data: {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        status: item.status as Status,
                        created: item.created,
                    }
                })
            } catch (e) {
                console.error(`Error creating item: ${item}`);
                console.error('Actual item:', item);
                console.error('Error:', e);
            }
        }

        for (const item of workers) {
            try {
                await db.worker.createMany({
                    data: {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        bot: item.bot,
                        created: item.created,
                    }
                })
            } catch (e) {
                console.error(`Error creating item: ${item}`);
                console.error('Actual item:', item);
                console.error('Error:', e);
            }
        }

        for (const item of logs) {
            try {
                await db.log.createMany({
                    data: {
                        id: item.id,
                        bot: item.bot,
                        worker: item.worker,
                        message: item.message,
                        created: new Date(item.created),
                    }
                })
            } catch (e) {
                console.error(`Error creating item: ${item}`);
                console.error('Actual item:', item);
                console.error('Error:', e);
            }
        }


    } catch (e) {
        console.log(e)
    }
}

seedDB()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => {
        process.exit(0)
    })