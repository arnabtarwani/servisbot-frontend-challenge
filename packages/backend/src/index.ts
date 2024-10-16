import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"

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

// Start your server
server.listen({ port: parseInt(process.env.PORT ?? "8080") }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`server listening on ${address}`)
})