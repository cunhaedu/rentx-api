import { createConnection } from 'typeorm';

createConnection().then(() => {
  console.log('Connect to database');
});
