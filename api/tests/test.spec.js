import chaiHTTP from 'chai-http';
import chai, { request, expect, should } from 'chai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from "../index";
import { userCredentials, missingParameter, routes, JSON_TYPE, logData } from '../data/data';
import { CREATED_CODE, BAD_REQUEST_CODE, UNPROCESSABLE_ENTITY, RESOURCE_CONFLICT, METHOD_NOT_FOUND, SUCCESS_CODE, UNAUTHORIZED_CODE } from '../constants/responseCodes';
import { AUTHENTIFICATED_MSG } from '../constants/feedback';
import { METHOD_NOT_FOUND_MSG, UNAUTHORIZED_ACCESS } from '../constants/responseMessages';
import { it } from 'mocha';

chai.use(chaiHTTP);

dotenv.config();

before((done) => {
    mongoose.connect(process.env.DB_TEST_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    mongoose.connection.once('open', () =>{
        mongoose.connection.collections.users.drop(() => {
            console.log('Testing database connection established');
            done();
        });
    })
});

describe('API Routers', () => {
    it('Should track invalid routes and Endpoints', (done) => {
        request(app).get('/').end((err, res) => {
            expect(res.body.status).to.be.equal(METHOD_NOT_FOUND);
            expect(res.body.message).to.be.equal(METHOD_NOT_FOUND_MSG);
            done();
        });
    })
});

describe('User authentication Endpoint', ()=> {
    describe('User should be able to sign up', ()=> {
        it('Should create new user', (done) => {
            request(app)
            .post(routes.signUp)
            .set('Accept', JSON_TYPE)
            .send(userCredentials).end((err, res) => {
                expect(res.body.status).to.be.equal(CREATED_CODE);
                expect(res.body.message).equal(AUTHENTIFICATED_MSG);
                expect(res.body).to.haveOwnProperty('data');
                done();
            });
        });
    
        it('Should not duplicate users', (done) => {
            request(app)
            .post(routes.signUp)
            .set('Accept', JSON_TYPE)
            .send(userCredentials).end((err, res) => {
                expect(res.body.status).to.be.equal(BAD_REQUEST_CODE);
                done();
            });
        });
        it('Should not validate user with missing required parameters', (done) => {
            request(app)
            .post(routes.signUp)
            .set('Accept', JSON_TYPE)
            .send(missingParameter).end((err, res) => {
                expect(res.body.status).to.be.equal(UNPROCESSABLE_ENTITY);
                expect(res.body).to.haveOwnProperty('error');
                done();
            });
        });
        it('Should validate user email', (done) => {
            userCredentials.email = "eliezer.basubi30gmail.com";
            request(app)
            .post(routes.signUp)
            .set('Accept', JSON_TYPE)
            .send(userCredentials).end((err, res) => {
                expect(res.body.status).to.be.equal(RESOURCE_CONFLICT);
                expect(res.body).to.haveOwnProperty('error');
                done();
            });
        });
    });

    describe('User should be able to sign in', ()=> {
        it('Should log in user', (done) =>{
            request(app)
            .post(routes.signIn)
            .send(logData)
            .set('Accept', JSON_TYPE)
            .end((err, res) => {
                expect(res).to.have.status(SUCCESS_CODE);
                expect(res.type).to.be.equal(JSON_TYPE);
                expect(res.body.message).to.be.equal('Auth successful');
                done();
            });
        });

        it('Should reject unauthenticated user', (done) => {
            logData.email = "eliezer.basubi400@gmail.com";
            request(app)
            .post(routes.signIn)
            .send(logData)
            .set('Accept', JSON_TYPE)
            .end((err, res) => {
                expect(res).to.have.status(UNAUTHORIZED_CODE);
                expect(res.body.error).to.be.equal(UNAUTHORIZED_ACCESS);
                done();
            });
        });
    });
})