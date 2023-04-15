import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';
import app from '../app';
import { preload } from '../loaders/preload';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Tpic', () => {
    let token: string;
    let id: number;
    before(async function () {
		await preload();
        // Get token
        const res = await chai.request(app).post('/api/v1/user/login').send({
            user: 'admin',
            password: 'Disruptive2023'
        });
        token = res.body.token;
    });

    it('Should get all topics', async () => {
        const res = await chai.request(app)
            .get('/api/v1/topics')
            .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('description');
        expect(res.body[0]).to.have.property('image');
    });

    it('Should get a topic', async () => {
        const res = await chai.request(app)
            .get('/api/v1/topic/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.be.equal(1);
    });

    it('Should error validation when create a topic', async () => {
        const res = await chai.request(app)
            .post('/api/v1/topic')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test',
                description: 'Test Description Topic',
                image: 'Test Image'
            });
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('WRONG_DATA');
    });

    it('Should create a topic', async () => {
        const res = await chai.request(app)
            .post('/api/v1/topic')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Topic',
                description: 'Test Description Topic',
                image: 'https://www.google.com'
            });
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        id = res.body.id;
    });

    it('Should error validation when update a topic', async () => {
        const res = await chai.request(app)
            .put('/api/v1/topic/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test',
                description: 'Test Description Topic',
                image: 'Test Image'
            });
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('WRONG_DATA');
    });

    it('Should update a topic', async () => {
        const res = await chai.request(app)
            .put(`/api/v1/topic/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Topic',
                description: 'Test Description Topic',
                image: 'https://www.google.com'
            });
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.is.equal(id);
    });

});