import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app';
import { describe, it } from 'node:test';
import assert from 'assert';

chai.should();
chai.use(chaiHttp);

describe(`${process.env.serverName} - Index Integration tests`, () => {
    describe('Get /', function () {
        it('it should return 200 OK', async (done) => {
        const res = await server.inject({
            url: '/',
            method: 'GET'
        });
        assert.deepStrictEqual(res?.statusCode, 200)
        });
    })
})