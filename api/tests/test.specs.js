import chaiHTTP from 'chai-http';
import chai, { request, expect, should } from 'chai';
import app from "../index";

chai.use(chaiHTTP);

describe('Fetch all fashion model products', ()=> {
    it('Should retrieve trending products', (done) => {
        request(app).get('/').end((err, res) => {
            expect(res.body.status).to.be.equal(200);
            done();
        })
    })
})