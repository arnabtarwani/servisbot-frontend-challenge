import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import db from 'prisma'

/**
 * initialising FastifyInstance 
 */
const server: FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
> = fastify({ logger: true })

/**
 * registering CORS and Helmet plugins
 */
server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    credentials: true
})

server.register(helmet)

/** 
 * a random route to check if the server is running
 */
server.get<{
}>('/', (_request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({ pong: 'Welcome to ServisBot Task!' })
})

/**
 * a route to get all bots
 * @returns {Array} bots
 */
server.get("/bots", async (_request: FastifyRequest, reply: FastifyReply) => {
    const bots = await db.bot.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            status: true,
            created: true
        }
    }).then((bots) => {
        return bots.map((bot) => {
            return {
                id: bot.id,
                name: bot.name,
                description: bot.description,
                status: bot.status,
                created: Number(bot.created)
            }
        })
    })

    if (!bots.length) {
        return reply.code(404).send({ message: "No bots found" })
    }

    reply.code(200).send(bots)
})

/**
 * a route to get a specific bot
 * @param {String} botId
 * @returns {Object} bot
 */
server.get("/bots/:botId", async (request: FastifyRequest<{
    Params: {
        botId: string
    }
}>, reply: FastifyReply) => {
    const { botId } = request.params

    if (!botId) {
        return reply.code(400).send({ message: "Bot Id is required" })
    }

    const bot = await db.bot.findFirstOrThrow({
        where: {
            id: botId
        },
        select: {
            id: true,
            name: true,
            description: true,
            status: true,
            created: true
        }
    }).then((bot) => {
        return {
            id: bot?.id,
            name: bot?.name,
            description: bot?.description,
            status: bot?.status,
            created: Number(bot?.created)
        }

    })

    if (!bot) {
        return reply.code(404).send({ message: "No bots found" })
    }

    reply.code(200).send(bot)
})

/**
 * a route to get all workers for a specific bot
 * @param {String} bot
 * @returns {Array} workers
 */
server.get("/workers/:bot", async (request: FastifyRequest<{ Params: { bot: string } }>, reply: FastifyReply) => {

    const { bot } = request.params

    if (!bot) {
        return reply.code(400).send({ message: "Bot name is required" })
    }

    const workers = await db.worker.findMany({
        where: {
            bot: bot
        },
        select: {
            id: true,
            name: true,
            description: true,
            bot: true,
            created: true
        }
    }).then((workers) => {
        return workers.map((worker) => {
            return {
                id: worker.id,
                name: worker.name,
                description: worker.description,
                bot: worker.bot,
                created: Number(worker.created)
            }
        })
    })

    if (!workers?.length) {
        return reply.code(404).send({ message: "No workers found" })
    }

    reply.code(200).send(workers)
})

/**
 * a route to get all logs for a specific bot
 * @param {String} bot
 * @returns {Array} logs
 */
server.get("/logs/:bot", async (request: FastifyRequest<{ Params: { bot: string }, Querystring: { offset?: string, limit?: string } }>, reply: FastifyReply) => {
    const { bot } = request.params

    if (!bot) {
        return reply.code(400).send({ message: "Bot Id is required" })
    }

    const logs = await db.log.findMany({
        where: {
            bot: bot
        },
        select: {
            id: true,
            worker: true,
            bot: true,
            message: true,
            created: true
        }
    }).then((logs) => {
        return logs.map((log) => {
            return {
                id: log.id,
                worker: log.worker,
                bot: log.bot,
                message: log.message,
                created: Number(log.created)
            }
        })
    })

    if (!logs.length) {
        return reply.code(404).send({ message: "No logs found" })
    }

    reply.code(200).send(logs)
})

/**
 * a route to get all logs for a specific bot and worker
 * @param {String} bot
 * @param {String} worker
 * @returns {Array} logs
 */
server.get("/logs/:bot/:worker", async (request: FastifyRequest<{ Params: { bot: string, worker: string } }>, reply: FastifyReply) => {
    const { bot, worker } = request.params

    if (!bot || !worker) {
        return reply.code(400).send({ message: "Bot and Worker Ids are required" })
    }

    const logs = await db.log.findMany({
        where: {
            bot: bot,
            worker: worker
        },
        select: {
            id: true,
            worker: true,
            bot: true,
            message: true,
            created: true
        }
    }).then((logs) => {
        return logs.map((log) => {
            return {
                id: log.id,
                worker: log.worker,
                bot: log.bot,
                message: log.message,
                created: Number(log.created)
            }
        })
    })

    if (!logs.length) {
        return reply.code(404).send({ message: "No logs found" })
    }

    reply.code(200).send(logs)
})


// Start your server
server.listen({ port: parseInt(process.env.PORT ?? "8080") }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`server listening on ${address}`)
})
