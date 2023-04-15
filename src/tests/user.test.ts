import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';
import app from '../app';
import { preload } from '../loaders/preload';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('User', () => {
    before(async function () {
		await preload();
    });
    let token: string;
    it('Should return wrong email or password', async () => {
        const res = await chai.request(app).post('/api/v1/user/login').send({
            user: 'admin@email.com',
            password: 'admin1234567',
        });
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.description).to.be.equal('Wrong email or password');
    });

    it('Should return token', async () => {
        const res = await chai.request(app).post('/api/v1/user/login').send({
            user: 'admin@email.com',
            password: 'Disruptive2023'
        });
        token = res.body.token;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
    });

    it('Should return validations error', async () => {
        const res = await chai.request(app).post('/api/v1/user/login');
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('description');
    });

    it('Should validation error when insert a new user', async () => {
        const res = await chai.request(app).post('/api/v1/user')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test',
                email: 'some@email.com',
                password: 'Disruptive2023',
                user_name: 'test'
            });
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('description');
    });

    it('Should return user created', async () => {
        const res = await chai.request(app).post('/api/v1/user')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Test',
                email: 'some@email.com',
                password: 'Disruptive2023@',
                user_name: 'test123',
                role: 'creator'
            });
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
    });
});