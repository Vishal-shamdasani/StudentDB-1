const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Student = require('../models/studentModel');

describe('Student API', () => {
  beforeAll(async () => {
    const url = process.env.MONGO_URI;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new student', async () => {
    const response = await request(app)
      .post('/api/students')
      .send({
        name: 'John Doe',
        age: 20,
        class: '12th Grade',
        grade: 'A',
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('John Doe');
  });

  it('should fetch students with pagination', async () => {
    const response = await request(app)
      .get('/api/students?page=1&limit=2&sortBy=name&order=asc');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update a student', async () => {
    const student = await Student.create({
      name: 'Jane Doe',
      age: 22,
      class: '11th Grade',
      grade: 'B',
    });

    const response = await request(app)
      .put(`/api/students/${student._id}`)
      .send({ name: 'Jane Updated' });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Jane Updated');
  });

  it('should delete a student', async () => {
    const student = await Student.create({
      name: 'Mark Smith',
      age: 25,
      class: 'Graduate',
      grade: 'A',
    });

    const response = await request(app).delete(`/api/students/${student._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Student deleted');
  });
});
