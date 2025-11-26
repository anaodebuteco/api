const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

describe('Tasks', () => {
  let token;

  beforeAll(async () => {
    process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/api_tarefas_test';
    await mongoose.connect(process.env.MONGODB_URI);

    await request(app).post('/api/v1/auth/signup').send({
      name: 'User',
      email: 'user@example.com',
      password: 'password123',
    });

    const login = await request(app).post('/api/v1/auth/login').send({
      email: 'user@example.com',
      password: 'password123',
    });
    token = login.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  test('POST /tasks cria tarefa', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Minha tarefa', description: 'Detalhes' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Minha tarefa');
  });

  test('GET /tasks retorna lista', async () => {
    const res = await request(app)
      .get('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /tasks/:id atualiza tarefa', async () => {
    const created = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Atualizar', description: '' });

    const res = await request(app)
      .put(`/api/v1/tasks/${created.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'done' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('done');
  });

  test('DELETE /tasks/:id deleta tarefa', async () => {
    const created = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Apagar', description: '' });

    const res = await request(app)
      .delete(`/api/v1/tasks/${created.body._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
