import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/team';
import ITeam from '../interfaces/ITeam';
import Err from '../middlewares/Err';

chai.use(chaiHttp);

const { expect } = chai;

const teamMock: ITeam = {
  id: 1,
  teamName: 'Bahia',
}

describe('Test the /team route', () => {
  describe('/get endpoint', () => {
    before(() => {
      Sinon.stub(Team, "findAll").resolves([teamMock] as Team[]);
    })

    after(() => {
      Sinon.restore();
    })

    it('Verify status 200 with correct response', async () => {
      const response = await chai.request(app).get('/teams')
      expect(response.status).to.equal(200)
    })
  })

  describe('/get/:id endpoint', () => {
    it('Verify status 200 with found team', async () => {
      before(() => {
        Sinon.stub(Team, "findByPk").resolves(teamMock as Team);
      })

      after(() => {
        Sinon.restore();
      })
      const response = await chai.request(app).get('/teams/1')

      expect(response.status).to.equal(200)
    })

    it('Verify status 400 team not found', async () => {
      before(() => {
        Sinon.stub(Team, "findByPk").resolves({} as Team);
      })

      after(() => {
        Sinon.restore();
      })
      const response = await chai.request(app).get('/teams/100')

      expect(response.status).to.equal(400)
    })
  })
});

describe('Test catch/nextFunction block on teams', async () => {
  describe('next /teams getAll', async () => {
    before(async () => {
      Sinon.stub(Team, "findAll").rejects(new Err(400, 'next'));
    })

    after(async () => {
      Sinon.restore();
    })

    it('Verify next /teams', async () => {
      const response = await chai.request(app).get('/teams')

      expect(response.status).to.equal(400)
    })
  })

  describe('next /teams/:id getById', async () => {
    before(async () => {
      Sinon.stub(Team, "findByPk").rejects(new Err(400, 'next'));
    })

    after(async () => {
      Sinon.restore();
    })

    it('Verify next /teams/:id', async () => {
      const response = await chai.request(app).get('/teams/1')

      expect(response.status).to.equal(400)
    })
  })
});
