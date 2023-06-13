import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app';
import { describe, it} from "node:test";
import assert from "assert";
import { email, password } from '../tests/auth.tests'

chai.should();
chai.use(chaiHttp);

describe(`${process.env.serverName} - User Integration tests`, () => {
    describe('Post /api/auth/register', function () {
      it('It should get USER DASHBOARD', async (done) => {
        const user = {
          email: email,
          password: password
        };
        const loginRes = await server.inject({
          url: "/api/auth/login",
          method: "POST",
          payload: user
        });
        const responseBody = JSON.parse(loginRes.body)
        const res = await server.inject({
            url: "/api/user/dashboard",
            method: "GET",
            payload: user,
            headers: {
                Authorization: `${responseBody.message.access_token}`,
            }
        });
        assert.deepStrictEqual(res?.statusCode, 200);
        assert.deepStrictEqual(JSON.parse(res?.body).success, true);
      });
    }),
    describe('Post /api/user/referral', function () {
        it('It should get USER Referrals', async (done) => {
          const user = {
            email: email,
            password: password
          };
          const loginRes = await server.inject({
            url: "/api/auth/login",
            method: "POST",
            payload: user
          });
          const responseBody = JSON.parse(loginRes.body)
          const res = await server.inject({
              url: "/api/user/referral?page=0&pageSize=5",
              method: "GET",
              headers: {
                  Authorization: `${responseBody.message.access_token}`,
              }
          });
          assert.deepStrictEqual(res?.statusCode, 200);
          assert.deepStrictEqual(JSON.parse(res?.body).success, true);
        });
      });
  });