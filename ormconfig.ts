module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'plantes-dev',
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/src/entity/index{.ts,.js}`],
  cli: {
    entitiesDir: './src/entity',
    migrationsDir: './src/migration',
    subscribersDir: './src/subscriber',
  },
};
