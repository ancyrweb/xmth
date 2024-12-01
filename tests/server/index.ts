import Fastify, { FastifyReply } from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import fs from 'fs';

const distPath = path.resolve(__dirname, '../../dist');
const pagesPath = path.resolve(__dirname, 'pages');
const fragmentsPath = path.resolve(__dirname, 'fragments');

const fastify = Fastify({
  logger: false,
});

const renderPage = (page: string, folder: string, reply: FastifyReply) => {
  const pagePath = path.resolve(folder, page + '.html');

  if (fs.existsSync(pagePath) && fs.lstatSync(pagePath).isFile())
    return reply.type('text/html').send(fs.readFileSync(pagePath, 'utf-8'));

  reply.status(404).send('Page not found');
};

fastify.register(fastifyStatic, {
  root: distPath,
  prefix: '/js/',
});

fastify.get('/', function (request, reply) {
  return renderPage('index', pagesPath, reply);
});

fastify.get('/pages', function (request, reply) {
  return renderPage('index', pagesPath, reply);
});

fastify.get('/pages/:page', function (request, reply) {
  // @ts-ignore
  const page = request.params.page;
  return renderPage(page, pagesPath, reply);
});

fastify.get('/fragments/:fragment', function (request, reply) {
  // @ts-ignore
  const fragment = request.params.fragment;
  return renderPage(fragment, fragmentsPath, reply);
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
