import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/user';
import { IUser } from '../interfaces/IUser';
import { afterEach, beforeEach } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

const userMock:IUser = {
  id: 1,
  username: 'zezinho',
  email: 'zezinho@email.com',
  password: 'supersecreto',
  role: 'admin'
}

describe('Test the /login endpoint', () => {
  describe('/post endpoint', () => {
    beforeEach(() => {
      sinon.stub(User, "findOne").resolves(userMock as User);
    })

    afterEach(() => {
      sinon.restore();
    })
    it('Verify status 400 without body', async () => {
      const response = await chai.request(app).post('/login')

      expect(response.status).to.equal(400)
    })
/*     it('Verify status 200', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      })

      expect(response.status).to.equal(200)
    }) */
  })
});
