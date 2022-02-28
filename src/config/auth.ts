export default (): {
  SECRET: string;
  EXPIRES_IN: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRES_IN: string;
  REFRESH_TOKEN_EXPIRES_DAYS: number;
} => {
  return {
    SECRET: process.env.JWT_SECRET || '',
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '',
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
    REFRESH_TOKEN_EXPIRES_DAYS: parseInt(
      process.env.REFRESH_TOKEN_EXPIRES_DAYS || '30',
      10,
    ),
  };
};
