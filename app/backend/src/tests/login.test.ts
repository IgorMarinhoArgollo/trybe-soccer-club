import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { IUser, IRole } from '../interfaces/IUser';
import { app } from '../app';
import User from '../database/models/user';
import Err from '../middlewares/Err';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: IUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const roleMock: IRole = {
  role: 'admin',
}

describe('Test the /login route', async () => {
  describe('/post endpoint', async () => {
    before(async () => {
      Sinon.stub(User, "findOne").resolves(userMock as User);
    })

    after(async () => {
      Sinon.restore();
    })
    it('Verify status 400 without body', async () => {
      const response = await chai.request(app).post('/login')

      expect(response.status).to.equal(400)
    })
    it('Verify status 200 with correct body', async () => {
      const response = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' })
      expect(response.status).to.equal(200);
    })
    it('Verify status 401 with wrong login data', async () => {
      const response = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret' })
      expect(response.status).to.equal(401) // adjust  asdasda sda s
    })
  })

  describe('Test the /login/validate endpoint', async () => {
    it('Verify status 200 with correct body', async () => {
        before(async () => {
          Sinon.stub(User, "findOne").resolves(roleMock as User);
        })
    
        after(async () => {
          Sinon.restore();
        })
        const response = await chai.request(app).get('/login/validate').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2MTQ0OTk5NSwiZXhwIjoxNjYyMDU0Nzk1fQ.memDRz8qXYnsWwDsFwdv5-DS7q0jjsNCgLcdyMRtsDk');
        expect(response.status).to.equal(200)
      })
    
      it('Verify status 401 without header token', async () => {
        const response = await chai.request(app).get('/login/validate');

        expect(response.status).to.equal(401);
      })
  });
});

describe('Test catch/nextFunction block on login', async () => {
  describe('next /post login', async () => {
    before(async () => {
      Sinon.stub(User, "findOne").rejects(new Err(400, 'next'));
    })

    after(async () => {
      Sinon.restore();
    })
    it('Verify next /login', async () => {
      const response = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' })

      expect(response.status).to.equal(400)
    })
  })

  describe('next /get/validate', async () => {
    before(async () => {
      Sinon.stub(User, "findOne").rejects(new Err(400, 'next'));
    })

    after(async () => {
      Sinon.restore();
    })
    it('Verify next /login/validate', async () => {
      const response = await chai.request(app).get('/login/validate').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2MTQ0OTk5NSwiZXhwIjoxNjYyMDU0Nzk1fQ.memDRz8qXYnsWwDsFwdv5-DS7q0jjsNCgLcdyMRtsDk');

      expect(response.status).to.equal(400)
    })
  })
});