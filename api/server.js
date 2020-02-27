// As early as possible in your application, require and configure dotenv.
// https://www.npmjs.com/package/dotenv#usage
require('dotenv').config();
const Hapi = require('@hapi/hapi');

const preResponseUtils = require('./lib/infrastructure/utils/pre-response-utils');

const routes = require('./lib/routes');
const plugins = require('./lib/plugins');
const config = require('./lib/config');

const createServer = async () => {

  const server = new Hapi.server({
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['X-Requested-With']
      },
      response: {
        emptyStatusCode: 204
      }
    },
    port: config.port,
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true
    }
  });

  server.ext('onPreResponse', preResponseUtils.catchDomainAndInfrastructureErrors);

  const configuration = [].concat(plugins, routes);

  await server.register(configuration);

  return server;
};

module.exports = createServer;
