require('dotenv').config();
const Cow = require('../src/models/cows.js');
const request = require('supertest');
const app = require('../src/routes/index.js');

//DB connection
const mongoose = require('mongoose');

describe('Backend testing', () => {
  beforeAll(() => {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('DB connected'))
      .catch((e) => console.log('connection error', e));
  });

  describe('Part ONE: Cows model', () => {
    it('should not create the cow if id_senasa is not sent', async () => {
      expect.assertions(1);
      try {
        await Cow.create({
          animal_type: 'Novillo',
          paddock_name: 'lidice',
          device_type: 'COLLAR',
          device_number: '12345678',
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the cow if animal_type is not sent', async () => {
      expect.assertions(1);
      try {
        await Cow.create({
          id_senasa: '0123456789abcdef',
          paddock_name: 'lidice',
          device_type: 'COLLAR',
          device_number: '12345678',
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the cow if paddock_name is not sent', async () => {
      expect.assertions(1);
      try {
        await Cow.create({
          id_senasa: '0123456789abcdef',
          animal_type: 'Novillo',
          device_type: 'COLLAR',
          device_number: '12345678',
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the cow if device_type is not sent', async () => {
      expect.assertions(1);
      try {
        await Cow.create({
          id_senasa: '0123456789abcdef',
          animal_type: 'Novillo',
          paddock_name: 'lidice',
          device_number: '12345678',
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the cow if device_number is not sent', async () => {
      expect.assertions(1);
      try {
        await Cow.create({
          id_senasa: '0123456789abcdef',
          animal_type: 'Novillo',
          paddock_name: 'lidice',
          device_type: 'COLLAR',
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should create the cow if all required properties are ok, even if animal_weight is missing since it is not mandatory', async () => {
      const cow = await Cow.create({
        id_senasa: '0123456789abcdef',
        animal_type: 'Novillo',
        paddock_name: 'lidice',
        device_type: 'COLLAR',
        device_number: '12345678',
      });
      expect(cow.toJSON()).toHaveProperty('id_senasa', '0123456789abcdef');
      expect(cow.toJSON()).toHaveProperty('animal_type', 'Novillo');
      expect(cow.toJSON()).toHaveProperty('paddock_name', 'lidice');
      expect(cow.toJSON()).toHaveProperty('device_type', 'COLLAR');
      expect(cow.toJSON()).toHaveProperty('device_number', '12345678');
    });

    it('should not create the cow if id_senasa is longer than 16 characters', async () => {
      expect.assertions(1);
      try {
        await Cow.create({
          id_senasa: '0123456789abcdefg',
          animal_type: 'Novillo',
          paddock_name: 'lidice',
          device_type: 'COLLAR',
          device_number: '12345678',
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the cow if animal_type is different than Novillo, Toro or Vaquillona', async () => {
      expect.assertions(1);
      try {
        await Cow.create({
          id_senasa: '0123456789abcdef',
          animal_type: 'Vaca',
          paddock_name: 'lidice',
          device_type: 'COLLAR',
          device_number: '12345678',
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the cow if paddock_type is longer than 200 characters', async () => {
      expect.assertions(1);
      try {
        await Cow.create({
          id_senasa: '0123456789abcdef',
          animal_type: 'Novillo',
          paddock_name:
            'ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
          device_type: 'COLLAR',
          device_number: '12345678',
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the cow if device_type is different than COLLAR or CARAVANA', async () => {
      expect.assertions(1);
      try {
        await Cow.create({
          id_senasa: '0123456789abcdef',
          animal_type: 'Novillo',
          paddock_name: 'lidice',
          device_type: 'campana',
          device_number: '12345678',
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the cow if device_number is longer than 8 characters', async () => {
      expect.assertions(1);
      try {
        await Cow.create({
          id_senasa: '0123456789abcdef',
          animal_type: 'Novillo',
          paddock_name: 'lidice',
          device_type: 'COLLAR',
          device_number: '123456789',
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });

  describe('Part TWO: CRUD', () => {
    it('should return status 404 if any of the mandatory parameters is not send', async () => {
      const res = await request(app).post('/post');
      expect(res.statusCode).toBe(404);
    });

    it('should return status 201 and cow object if the cow was succesfully created', async () => {
      const res = await request(app).post('/post').send({
        id_senasa: '0123456789abcdef',
        animal_type: 'Novillo',
        paddock_name: 'lidice',
        device_type: 'COLLAR',
        device_number: '12345678',
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id_senasa', '0123456789abcdef');
      expect(res.body).toHaveProperty('animal_type', 'Novillo');
      expect(res.body).toHaveProperty('paddock_name', 'lidice');
      expect(res.body).toHaveProperty('device_type', 'COLLAR');
      expect(res.body).toHaveProperty('device_number', '12345678');
    });

    it('should return status 404 if the database creation fails', async () => {
      const res = await request(app)
        .post('/post')
        .send({ id_senasa: '0123456789abcdef' });
      expect(res.statusCode).toBe(404);
    });

    it('should return status 200 and length to be different to 0 when getting all cows in database', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.body.length);
    });

    it('should get a cow based on the _id', async () => {
      const res = await request(app).post('/post').send({
        id_senasa: '0123456789abcdef',
        animal_type: 'Novillo',
        paddock_name: 'lidice',
        device_type: 'COLLAR',
        device_number: '12345678',
      });
      if (res.statusCode === 201) {
        const res2 = await request(app).get(`/${res.body._id}`);
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toHaveProperty('id_senasa', '0123456789abcdef');
        expect(res2.body).toHaveProperty('animal_type', 'Novillo');
        expect(res2.body).toHaveProperty('paddock_name', 'lidice');
        expect(res2.body).toHaveProperty('device_type', 'COLLAR');
        expect(res2.body).toHaveProperty('device_number', '12345678');
      }
    });

    it('should return status 404 when asking for an inexistent cow', async () => {
      const res = await request(app).get('/whatever5%&0987c');
      expect(res.statusCode).toBe(400);
    });

    it('should return status 201 when a cow is updated', async () => {
      const res = await request(app).post('/post').send({
        id_senasa: '0123456789abcdef',
        animal_type: 'Novillo',
        paddock_name: 'lidice',
        device_type: 'COLLAR',
        device_number: '12345678',
      });
      if (res.statusCode === 201) {
        const res2 = await request(app).put(`/put/${res.body._id}`).send({
          id_senasa: '0123456789abcdef',
          animal_type: 'Vaquillona',
          paddock_name: 'lidice',
          device_type: 'COLLAR',
          device_number: '22345678',
        });
        expect(res2.statusCode).toBe(201);
      }
    });

    it('should return status 400 when trying to edit an inexistent cow', async () => {
      const res = await request(app).put('/put/whatever5%&0987c').send({
        id_senasa: '0123456789abcdef',
        animal_type: 'Vaquillona',
        paddock_name: 'lidice',
        device_type: 'COLLAR',
        device_number: '22345678',
      });
      expect(res.statusCode).toBe(400);
    });

    it('should return status 200 when a cow is deleted', async () => {
      const res = await request(app).post('/post').send({
        id_senasa: '0123456789abcdef',
        animal_type: 'Novillo',
        paddock_name: 'lidice',
        device_type: 'COLLAR',
        device_number: '12345678',
      });
      if (res.statusCode === 201) {
        const res2 = await request(app).delete(`/delete/${res.body._id}`);
        expect(res2.statusCode).toBe(200);
      }
    });

    it('should return status 404 when trying to delete an inexistent cow', async () => {
      const res = await request(app).delete('/delete/whatever5%&0987c');
      expect(res.statusCode).toBe(400);
    });
  });

  afterAll(() => {
    mongoose.disconnect();
  });
});
