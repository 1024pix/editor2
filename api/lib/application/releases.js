const { PassThrough } = require('stream');
const Boom = require('@hapi/boom');
const releaseRepository = require('../infrastructure/repositories/release-repository');

exports.register = async function(server) {
  server.route([
    {
      method: 'GET',
      path: '/api/current-content',
      config: {
        handler: function() {
          const writableStream = new PassThrough();
          writableStream.headers = {
            'content-type': 'application/json',

            // WHY: to avoid compression because when compressing, the server buffers
            // for too long causing a response timeout.
            'content-encoding': 'identity',
          };
          return releaseRepository.getCurrentContentAsStream(writableStream);
        },
      },
    },
    {
      method: 'GET',
      path: '/api/releases/latest',
      config: {
        handler: async function() {
          const release = await releaseRepository.getLatestRelease();
          return JSON.stringify(release);
        },
      },
    },
    {
      method: 'GET',
      path: '/api/releases/{id}',
      config: {
        handler: async function(request) {
          const release = await releaseRepository.getRelease(request.params.id);
          if (release) {
            return JSON.stringify(release);
          } else {
            return Boom.notFound();
          }
        },
      },
    },
  ]);
};

exports.name = 'releases-api';
