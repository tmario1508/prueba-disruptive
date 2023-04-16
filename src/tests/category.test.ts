import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';
import app from '../app';
import { preload } from '../loaders/preload';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Category', () => {
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

    it('Should get all categories', async () => {
        const res = await chai.request(app)
            .get('/api/v1/categories')
            .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('name');
    });

    it('Should name validation error when create a category', async () => {
        const res = await chai.request(app)
            .post('/api/v1/category')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Imágenes',
                description: 'Test Description Category',
                image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
            });
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('WRONG_DATA');
        expect(res.body.description[0].name).to.be.equal('Category with this name already exists');
    });

    it('Should create a category', async () => {
        const res = await chai.request(app)
            .post('/api/v1/category')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Category',
                description: 'Test Description Category',
                image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
            });
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        id = res.body.id;
    });

    it('Should get a category', async () => {
        const res = await chai.request(app)
            .get(`/api/v1/category/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.equal(id);
        expect(res.body).to.have.property('name');
    });

    it('Should update a category', async () => {
        const res = await chai.request(app)
            .put(`/api/v1/category/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Updated',
                description: 'Test Description Category Updated',
                image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
            });
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name');
    });

    it('Should delete a category', async () => {
        const res = await chai.request(app)
            .delete(`/api/v1/category/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Category deleted')
    });
});