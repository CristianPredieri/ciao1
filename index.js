// Require the framework and instantiate it

// ESM
import Fastify from 'fastify'
import fs from 'fs'
import path from 'path'

const fastify =Fastify({
  logger: true
})
const filePath="./web-escape-room/rooms/room6/index.html"
// Declare a route
fastify.get('/', function (request, reply) {
  return reply.type('text/html').send(fs.readFileSync(filePath))
})



fastify.get('/*', (request, reply) => {

  if (!fs.existsSync(filePath)) {
    return reply.status(404).send('File non trovato')
  }

const ext = path.extname(filePath)
  const contentType = {
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.html': 'text/html'
  }[ext] || 'application/octet-stream'

  const content = fs.readFileSync(filePath)
  return reply.type(contentType).send(content)
})



// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})