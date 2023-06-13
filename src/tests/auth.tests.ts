import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app';
import { describe, it} from "node:test";
import assert from "assert";
import userRepo from '../modules/user/user.repository'

chai.should();
chai.use(chaiHttp);

export const email = "johndoe@gmail.com"
export const password = 'test1234'

describe(`${process.env.serverName} - Auth Integration tests`, () => {
    describe('Post /api/auth/register', function () {
      const email = "johndoe@gmail.com"
      const password = 'test1234'
      it('It should POST a new user', async (done) => {
        await userRepo.deleteUserByEmail(email)
        const user = {
          name: "John Doe",
          email: email,
          password: "test1234",
        };
        const res = await server.inject({
          url: "/api/auth/register",
          method: "POST",
          payload: user
        });
        assert.deepStrictEqual(res?.statusCode, 201);
        assert.deepStrictEqual(JSON.parse(res?.body).success, true);
      });
      it('It should NOT POST a new user that failed validation', async (done) => {
        const user = {
          name: "John Doe",
          email: email,
          password: password,
        };
        const res = await server.inject({
          url: "/api/auth/register",
          method: "POST",
          payload: user
        });
        assert.deepStrictEqual(res?.statusCode, 400);
        assert.deepStrictEqual(JSON.parse(res?.body).success, false);
      });
      it('It should LOGIN a user', async (done) => {
        const user = {
          email: email,
          password: password
        };
        const res = await server.inject({
          url: "/api/auth/login",
          method: "POST",
          payload: user
        });
        assert.deepStrictEqual(res?.statusCode, 200);
        assert.deepStrictEqual(JSON.parse(res?.body).success, true);
      });
      it('It should NOT LOGIN a user', async (done) => {
        const user = {
          email: email,
          password: `${password}.`
        };
        const res = await server.inject({
          url: "/api/auth/login",
          method: "POST",
          payload: user
        });
        assert.deepStrictEqual(res?.statusCode, 400);
        assert.deepStrictEqual(JSON.parse(res?.body).success, false);
      });
    });
  });