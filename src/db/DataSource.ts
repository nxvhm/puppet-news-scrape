import 'dotenv/config'
import { DataSource } from "typeorm";

export const DB = new DataSource({
  type: "mysql",
  host: '127.0.0.1',
  port: 33060,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [__dirname + '/../Models/*.{js,ts}'],
  subscribers: [],
  migrations: ['migrations/*.ts']
})
