export default (): {
  SECRET: string;
} => {
  return {
    SECRET: process.env.JWT_SECRET || '',
  };
};
