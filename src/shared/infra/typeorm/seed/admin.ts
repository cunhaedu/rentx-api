import { createConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';

async function create() {
  const connection = await createConnection();

  const user = {
    id: uuidv4(),
    password: await hash('123admin', 10),
    name: 'Admin',
    email: 'admin@rentx.com',
  };

  try {
    await connection.query(
      'INSERT INTO users (id, name, email, password, is_admin, driver_license) VALUES ($1, $2, $3, $4, $5, $6)',
      [user.id, user.name, user.email, user.password, true, 'XXXX-XX'],
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  } finally {
    await connection.close();
  }
}

create().then(() => console.log('User admin created with success!'));
