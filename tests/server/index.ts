import Fastify, {FastifyReply} from 'fastify'
import path from 'path';
import fastifyStatic from '@fastify/static';
import fs from 'fs';

const distPath = path.resolve(__dirname, '../../dist');
const pagesPath = path.resolve(__dirname, 'pages');

const fastify = Fastify({
  logger: false
})

const renderPage = (page: string, reply: FastifyReply) => {
  const pagePath = path.resolve(pagesPath, page + '.html');

  if (
    fs.existsSync(pagePath) &&
    fs.lstatSync(pagePath).isFile()
  ) {
    reply.type("text/html").send(fs.readFileSync(pagePath, 'utf-8'));
    return;
  }

  reply.status(404).send('Page not found');
}

fastify.register(fastifyStatic, {
  root: distPath,
  prefix: '/js/'
})

fastify.get('/', function (request, reply) {
  return renderPage('index', reply);
});

fastify.get('/pages', function (request, reply) {
  return renderPage('index', reply);
});

fastify.get('/pages/:page', function (request, reply) {
  // @ts-ignore
  const page = request.params.page;
  return renderPage(page, reply);
});

fastify.get('/fragments/contacts', function (request, reply) {
  reply.type("text/html").send(`
    <div data-testid="contacts">
      <h1>Contacts</h1>
    </div>
  `)
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})