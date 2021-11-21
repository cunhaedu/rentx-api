import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
  return createConnection()
}
