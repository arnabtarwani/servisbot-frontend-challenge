import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import db from 'prisma'

const server: FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
> = fastify({ logger: true })

server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    credentials: true
})

server.register(helmet)

server.get<{
}>('/', (_request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({ pong: 'Welcome to ServisBot Task!' })
})

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

server.get("/bots/:botId", async (request: FastifyRequest<{
    Params: {
        botId: string
    }
}>, reply: FastifyReply) => {
    const { botId } = request.params

    if (!botId) {
        return reply.code(400).send({ message: "Bot Id is required" })
    }

    const bot = await db.bot.findFirst({
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

server.get("/workers/:bot", async (request: FastifyRequest<{ Params: { bot: string } }>, reply: FastifyReply) => {

    const { bot } = request.params

    console.log(bot)

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

server.get("/logs/:bot", async (request: FastifyRequest<{ Params: { bot: string }, Querystring: { offset?: string, limit?: string } }>, reply: FastifyReply) => {
    const { bot } = request.params
    const { offset, limit } = request.query

    if (!bot) {
        return reply.code(400).send({ message: "Bot name is required" })
    }

    const logs = await db.log.findMany({
        where: {
            bot: bot
        },
        take: parseInt(limit as string) ? parseInt(limit as string) : 100,
        skip: parseInt(offset as string) ? parseInt(offset as string) : 0,
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

server.get("/logs/:bot/:worker", async (request: FastifyRequest<{ Params: { bot: string, worker: string } }>, reply: FastifyReply) => {
    const { bot, worker } = request.params

    if (!bot || !worker) {
        return reply.code(400).send({ message: "Bot and Worker names are required" })
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
