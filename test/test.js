const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../src/server');
const Category = require('../src/models/category');
chai.use(chaiHttp);


describe('categories', () => {

    beforeEach((done) => {
        Category.deleteMany({})
            .then(() => done());
    });

    it('get all', (done) => {
        chai.request(app)
            .get('/api/category')
            .then(response => {
                console.log(response.body);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.equal(0);
                done();
            })
            .catch(err => done(err));
    });

    it('create', (done) => {
        const categoryName = 'category1';
        chai.request(app)
            .put('/api/category')
            .send({ name: categoryName })
            .then(response => {
                expect(response).to.have.status(201);
                expect(response.body.name).to.equal(categoryName);
                chai.request(app)
                    .get('/api/category')
                    .then(response => {
                        expect(response.body).to.be.an('array');
                        expect(response.body.length).to.equal(1);
                        expect(response.body[0].name).to.equal(categoryName);
                        done();
                    })
                    .catch(err => done(err))
            })
            .catch(err => done(err));
    });

});


describe('users', () => {

    // beforeEach((done) => {
    //     Category.deleteMany({})
    //         .then(() => done());
    // });

    it('create', (done) => {
        const user = { name: 'yotam', password: '123456', email: 'yotam@gmail.com' };
        chai.request(app)
            .put('/api/user')
            .send(user)
            .then(response => {
                expect(response).to.have.status(201);
                // expect('Location', '');
                expect(response.body.name).to.equal('yotam');
                done();
            })
            .catch((err) => done(err));
        });
    it('should return a 200 response if the user is logged in', (done) => {
        chai.request(app)
            .get('/api/user/me')
            .then(response => {
                expect(response).to.have.status(200);
                done();
            })
            .catch(err => done(err));
    });
            // .then(response => {
                // console.log(response);
                // expect(response).to.have.status(201);
                // expect(response.body.name).to.equal('yotam');
                // expect(response.body.password).to.equal('123456');
                // expect(response.body.email).to.equal('yotam@gmail.com');
                // chai.request(app)
                //     .post('/api/user/login')
                //     .then(response => {
                //         expect(response).to.have.cookie();
                        // expect(response.body).to.be.an('object');
                        // expect(response.name).to.equal('yotam');
                        // chai.request(app)
                        //     .get('/api/user')
                        //     .then(function (response) {
                        //         expect(response).to.have.status(201);
                        //     });
                        // done();
    //                 })
    //                 .catch(err => done(err));
    //         });
    // });
});