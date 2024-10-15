import fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

const server: FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
> = fastify({ logger: true })

server.get<{
}>('/', (_request, reply) => {
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