import Fastify from 'fastify'
import path from 'path';
import fastifyStatic from '@fastify/static';

const distPath = path.resolve(__dirname, '../../dist');

const fastify = Fastify({
  logger: false
})

fastify.register(fastifyStatic, {
  root: distPath,
  prefix: '/js/'
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.type("text/html").send(`
    <html>
      <head>
        <title>xmth</title>
      </head>
      <body>
        <h1>Hello, world!</h1>
        <div xh-load="/fragments/contacts"></div>
        <script src="/js/index.js"></script>
      </body>
    </html>
  `)
})

// Declare a route
fastify.get('/fragments/contacts', function (request, reply) {
  reply.type("text/html").send(`
    <div data-testid="contacts">
      <h1>Contacts</h1>
    </div>
  `)
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})