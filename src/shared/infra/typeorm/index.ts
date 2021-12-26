import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import database from '@config/database';

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const databaseConfig = database();

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      database:
        process.env.NODE_ENV === 'test'
          ? databaseConfig.TEST_NAME
          : defaultOptions.database,
    }),
  );
};
