import chaiHTTP from 'chai-http';
import chai, { request, expect, should } from 'chai';
import app from "../index";

chai.use(chaiHTTP);

describe('Fetch all fashion model products', ()=> {
    it('Should create new user', (done) => {
        const data = {
            firstname: "Eliezer",
            lastname: "Basubi",
            email: "eliezer.basubi30@gmail.com",
            password: "eliezerbas1234",
        }

        request(app).post('/auth/signup').send(data).end((err, res) => {
            console.log(res.body);
            done();
        })
    })
})