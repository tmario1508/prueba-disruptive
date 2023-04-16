import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';
import app from '../app';
import { preload } from '../loaders/preload';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Publication', () => {
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

    it('Should get all publications with contents', async () => {
        const res = await chai.request(app)
            .get('/api/v1/publications')
            .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('title');
        expect(res.body.data[0]).to.have.property('credits');
        expect(res.body.data[0]).to.have.property('topic');
        expect(res.body.data[0]).to.have.property('contents');
        expect(res.body.data[0].contents).to.be.an('array');
        expect(res.body).to.have.property('total');
        expect(res.body.total).to.be.a('number');
    });

    it('Should get a publications for inviteds', async () => {
        const res = await chai.request(app)
            .get('/api/v1/publications');

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('title');
        expect(res.body.data[0]).to.have.property('credits');
        expect(res.body.data[0]).to.have.property('topic');
        expect(res.body.data[0]).to.not.have.property('contents');
        expect(res.body).to.have.property('total');
        expect(res.body.total).to.be.a('number');
    });


    it('Should validation error when create a publication', async () => {
        const res = await chai.request(app)
            .post('/api/v1/publication')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Publication',
                description: 'Test Description Publication',
                topic_id: 1,
                contents: [
                    {
                        category_id: 1,
                        content: {
                            text: 'Test Text',
                        }
                    },
                    {
                        category_id: 3,
                        content: {
                            url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                        }
                    },
                ]
            });
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('WRONG_DATA');
        expect(res.body).to.have.property('description');
        expect(res.body.description).to.be.an('array');
        expect(res.body.description[0]['contents[0].content']).to.be.equal('This content should have a url property');
        expect(res.body.description[1]['contents[1].content']).to.be.equal('This content should have a text property');
    });

    it('Should create a publication', async () => {
        const res = await chai.request(app)
            .post('/api/v1/publication')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Publication',
                description: 'Test Description Publication',
                topic_id: 1,
                contents: [
                    {
                        category_id: 1,
                        content: {
                            url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                        }
                    },
                    {
                        category_id: 3,
                        content: {
                            text: 'Test Text',
                        }
                    },
                ]
            });
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body.contents).to.be.an('array');
        id = res.body.id;
    });

    it('Should get a publication', async () => {
        const res = await chai.request(app)
            .get(`/api/v1/publication/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.equal(id);
        expect(res.body.contents).to.be.an('array');
    });

    it('Should get a publication for invited', async () => {
        const res = await chai.request(app)
            .get(`/api/v1/publication/${id}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.equal(id);
        expect(res.body).to.not.have.property('contents');
    });

    it('Should update a publication', async () => {
        const res = await chai.request(app)
            .put(`/api/v1/publication/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Publication Updated',
                description: 'Test Description Publication Updated',
                topic_id: 1,
                contents: [
                    {
                        category_id: 1,
                        content: {
                            url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                        }
                    },
                    {
                        category_id: 2,
                        content: {
                            url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                        }
                    },
                ]
            });
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.equal(id);
        expect(res.body.contents).to.be.an('array');
    });

    it('Should delete a publication', async () => {
        const res = await chai.request(app)
            .delete(`/api/v1/publication/${id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Publication deleted');
    });
});