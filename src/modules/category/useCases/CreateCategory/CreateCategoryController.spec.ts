import request from 'supertest';
import { app } from '@shared/infra/http/app';
import { Connection, getConnection } from 'typeorm';
import { v4 } from 'uuid';
import { hash } from 'bcrypt';

import createConnection from '@shared/infra/typeorm/index';

let connection: Connection;

describe('create category controller test suit', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.runMigrations();

    const user = {
      id: v4(),
      name: 'admin',
      email: 'admin@rentx.com',
      password: await hash('admin', 10),
      isAdmin: true,
      driverLicense: '123456',
    };

    await connection.query('DELETE FROM users');

    await connection.query(
      'INSERT INTO users (id, name, email, password, is_admin, driver_license) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        user.id,
        user.name,
        user.email,
        user.password,
        user.isAdmin,
        user.driverLicense,
      ],
    );
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM categories');
  });

  afterAll(async () => {
    await connection.dropDatabase();
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create a new category', async () => {
    const { body: responseToken } = await request(app)
      .post('/authenticate')
      .send({
        email: 'admin@rentx.com',
        password: 'admin',
      });

    const { token } = responseToken;

    const { status, body } = await request(app)
      .post('/categories')
      .set({ Authorization: `bearer ${token}` })
      .send({
        name: 'Category name sample',
        description: 'Category description sample',
      });

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });

  it('should not be able to create a new category with repeat name', async () => {
    const { body: responseToken } = await request(app)
      .post('/authenticate')
      .send({
        email: 'admin@rentx.com',
        password: 'admin',
      });

    const { token } = responseToken;

    await request(app)
      .post('/categories')
      .set({ Authorization: `bearer ${token}` })
      .send({
        name: 'Category name sample',
        description: 'Category description sample',
      });

    const { status, body } = await request(app)
      .post('/categories')
      .set({ Authorization: `bearer ${token}` })
      .send({
        name: 'Category name sample',
        description: 'Category description sample',
      });

    expect(status).toBe(422);
    expect(body).toEqual(
      expect.objectContaining({
        message: 'Category already exists!',
      }),
    );
  });
});
