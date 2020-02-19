const expect = require('chai').expect
const request = require('supertest')
const app = require('../server')

describe('Get /movie', () => {
    it('should return an array of movies', () => {
        return request(app)
        .get('/movie')
        .expect(200)
        .expect('Content-type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
        })
    });

    const params = ['genre', 'country', 'avg_vote']

    // it(`should return 400 if ${params} query is invalid`, () => {
    //     return request(app)

    // });

    it(`should return an array of movies filtered buy either ${params}`);
})