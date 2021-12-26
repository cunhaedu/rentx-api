export default (): {
  DIALECT: string;
  HOST: string;
  PORT: number;
  NAME: string;
  TEST_NAME: string;
  USER: string;
  PASSWORD: string;
} => {
  return {
    DIALECT: process.env.DB_DIALECT ?? 'postgres',
    HOST: process.env.DB_HOST ?? 'localhost',
    PORT: Number(process.env.DB_PORT) ?? 5432,
    NAME: process.env.DB_NAME ?? '',
    TEST_NAME: process.env.DB_TEST_NAME ?? '',
    USER: process.env.DB_USER ?? '',
    PASSWORD: process.env.DB_PASSWORD ?? '',
  };
};
