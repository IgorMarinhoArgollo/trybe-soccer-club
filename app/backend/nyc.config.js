module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: [
    'src/tests',
    'src/database/config',
    'src/database/migrations',
    'src/database/seeders',
    'src/app.ts',
    'src/server.ts',
    'src/interfaces',
    'src/helpers'
  ],
  include: ['src/**/*.ts']
};
