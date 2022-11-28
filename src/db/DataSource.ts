import 'dotenv/config'
import { DataSource } from "typeorm";

export const DB = new DataSource({
  type: "mysql",
  host: String(process.env.DB_HOST).valueOf(),
  port: Number(process.env.DB_PORT).valueOf(),
  username: String(process.env.DB_USER).valueOf(),
  password: String(process.env.DB_PASS).valueOf(),
  database: String(process.env.DB_NAME).valueOf(),
  synchronize: Boolean(Number(process.env.TYPEORM_ENTITIES_SYNC)).valueOf(),
  logging: Boolean(Number(process.env.TYPEORM_LOGGING)).valueOf(),
  entities: [__dirname + '/../Models/*.{js,ts}'],
  subscribers: [],
  migrations: ['migrations/*.ts']
})
