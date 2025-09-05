import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({ path: '.env' });

export const datasource: DataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV === 'development',
  entities: [__dirname + '//**/*/*.entity{.js,.ts}'],
  migrations: ['/dist/migrations/*.js'],
  migrationsTableName: 'migration',
});
