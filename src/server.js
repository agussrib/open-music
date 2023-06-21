require('dotenv').config();

const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');
const albums = require('./api/albums');
const songs = require('./api/songs');
const AlbumsService = require('./services/postgres/albumService');
const SongsService = require('./services/postgres/songService');
const ValitatorALbum = require('./validator/albums');
const ValidatorSong = require('./validator/songs');

const init = async () => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: new AlbumsService(),
        validator: ValitatorALbum,
      },
    },
    {
      plugin: songs,
      options: {
        service: new SongsService(),
        validator: ValidatorSong,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      if (!response.isServer) {
        return h.continue;
      }
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
