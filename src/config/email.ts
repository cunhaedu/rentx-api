export default (): {
  EMAIL_USER: string;
  EMAIL_PASS: string;
  EMAIL_HOST: string;
  EMAIL_PORT: number;
  EMAIL_FROM_NAME: string;
  EMAIL_FROM_EMAIL: string;
  FORGOT_EMAIL_URL: string;
} => {
  return {
    EMAIL_USER: process.env.EMAIL_USER ?? '',
    EMAIL_PASS: process.env.EMAIL_PASS ?? '',
    EMAIL_HOST: process.env.EMAIL_HOST ?? '',
    EMAIL_PORT: Number(process.env.EMAIL_PORT) ?? 2525,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME ?? 'Rentx',
    EMAIL_FROM_EMAIL: process.env.EMAIL_FROM_EMAIL ?? 'noreplay@rentx.com.br',
    FORGOT_EMAIL_URL:
      process.env.FORGOT_EMAIL_URL ??
      'http://localhost:3000/password/recover?token=',
  };
};
