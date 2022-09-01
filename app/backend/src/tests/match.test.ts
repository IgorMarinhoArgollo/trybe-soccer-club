import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/match';
import { IMatch } from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import Team from '../database/models/team';
import Err from '../middlewares/Err';

chai.use(chaiHttp);

const { expect } = chai;

const matchMock: IMatch = {
  "id": 41,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 9,
  "awayTeamGoals": 0,
  "inProgress": true,
}

const teamMock: ITeam = {
  id: 1,
  teamName: 'Bahia',
}

const teamTwoMock: ITeam = {
  id: 2,
  teamName: 'Vice',
}

describe('Test GET /matches route', () => {
  describe('matches endpoint', () => {
    before(() => {
      Sinon.stub(Match, "findAll").resolves([matchMock] as Match[]);
    })

    after(() => {
      Sinon.restore();
    })

    it('Verify status 200 with correct response', async () => {
      const response = await chai.request(app).get('/matches')
      expect(response.status).to.equal(200)
    })
  })

  describe('inProgress: true endpoint', () => {
    before(() => {
      Sinon.stub(Match, "findAll").resolves([matchMock] as Match[]);
    })

    after(() => {
      Sinon.restore();
    })

    it('Verify status 200 with correct response', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true')
      expect(response.status).to.equal(200)
    })
  })

  describe('inProgress: false endpoint', () => {
    before(() => {
      Sinon.stub(Match, "findAll").resolves([matchMock] as Match[])
    })

    after(() => {
      Sinon.restore();
    })

    it('Verify status 200 with found team', async () => {
      const response = await chai.request(app).get('/matches?inProgress=false')

      expect(response.status).to.equal(200)
    })
  })
});

describe('Test POST /matches route', () => {
  describe('/post endpoint', () => {
    it('Verify status 401 without token', async () => {
      const response = await chai.request(app).post('/matches')
      expect(response.status).to.equal(401)
    })

    it('Verify status 401 invalid token', async () => {
      const response = await chai.request(app).post('/matches').set('authorization', 'Bearer asdasdasd.asdasd.asdasd')
      expect(response.status).to.equal(401)
    })

    it('Verify status 400 invalid field', async () => {
      const response = await chai.request(app).post('/matches').set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2MTQ0OTk5NSwiZXhwIjoxNjYyMDU0Nzk1fQ.memDRz8qXYnsWwDsFwdv5-DS7q0jjsNCgLcdyMRtsDk')
      expect(response.status).to.equal(400)
    })

    it('Verify status 401 to equal teams', async () => {
      const response = await chai.request(app).post('/matches').set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2MTQ0OTk5NSwiZXhwIjoxNjYyMDU0Nzk1fQ.memDRz8qXYnsWwDsFwdv5-DS7q0jjsNCgLcdyMRtsDk').send({
        "homeTeam": 1,
        "awayTeam": 1,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      })
      expect(response.status).to.equal(401)
    })

    it('Verify status 404 no such a team', async () => {
      before(() => {
        var callback = Sinon.stub(Team, 'findByPk');
        callback.onCall(0).resolves({} as Team);
        callback.onCall(1).resolves(teamMock as Team);

      })

      after(() => {
        Sinon.restore();
      })

      const response = await chai.request(app).post('/matches').set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2MTQ0OTk5NSwiZXhwIjoxNjYyMDU0Nzk1fQ.memDRz8qXYnsWwDsFwdv5-DS7q0jjsNCgLcdyMRtsDk').send({
        "homeTeam": 96,
        "awayTeam": 1,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      })
      expect(response.status).to.equal(404)
    })

    it('Verify status 201 match created', async () => {
      before(() => {
        let callback = Sinon.stub(Team, 'findByPk');
        callback.onCall(0).resolves(teamMock as Team);
        callback.onCall(1).resolves(teamTwoMock as Team);
        Sinon.stub(Match, "create").resolves(matchMock as Match);
      })

      after(() => {
        Sinon.restore();
      })

      const response = await chai.request(app).post('/matches').set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2MTQ0OTk5NSwiZXhwIjoxNjYyMDU0Nzk1fQ.memDRz8qXYnsWwDsFwdv5-DS7q0jjsNCgLcdyMRtsDk').send({
        "homeTeam": 1,
        "awayTeam": 2,
        "homeTeamGoals": 3,
        "awayTeamGoals": 0
      })
      expect(response.status).to.equal(201)
    })
  })
});

describe('Test PATCH /matches/:id route', () => {
  describe('/get endpoint', () => {
    it('Verify status 200 with correct response', async () => {
      before(() => {
        Sinon.stub(Match, "findByPk").resolves(matchMock as Match);
        Sinon.stub(Match, "update").resolves();

      })

      after(() => {
        Sinon.restore();
      })

      const response = await chai.request(app).patch('/matches/46').send({ homeTeamGoals: 3, awayTeamGoals: 1 })

      expect(response.status).to.equal(200)
    })

    it('Verify status 400 on missing goals', async () => {

      const response = await chai.request(app).patch('/matches/46')
      expect(response.status).to.equal(400)
    })

    it('Verify status 400 on not found match', async () => {
      before(() => {
        Sinon.stub(Match, "findByPk").resolves({} as Match);
      })

      after(() => {
        Sinon.restore();
      })

      const response = await chai.request(app).patch('/matches/120').send({ homeTeamGoals: 3, awayTeamGoals: 1 })

      expect(response.status).to.equal(400)
    })
  })
})


describe('Test PATCH /matches/:id/finish route', () => {
  describe('/patch endpoint', () => {
    it('Verify status 200 with game id', async () => {
      before(async () => {
        Sinon.stub(Match, "findByPk").resolves(matchMock as Match);
      })

      after(() => {
        Sinon.restore();
      })

      const response = await chai.request(app).patch('/matches/46/finish')
      expect(response.status).to.equal(200)
    })

    it('Verify status 400 with wrong game id', async () => {
      before(async () => {
        Sinon.stub(Match, "findByPk").resolves({} as Match);
      })

      after(() => {
        Sinon.restore();
      })

      const response = await chai.request(app).patch('/matches/100/finish')
      expect(response.status).to.equal(400)
    })
  })
})

describe('Test catch/nextFunction block on matches', async () => {
  describe('next /matches getAll', async () => {
    before(async () => {
      Sinon.stub(Match, "findAll").rejects(new Err(400, 'next'));
    })
    after(async () => {
      Sinon.restore();
    })

    it('Verify next /matches', async () => {
      const response = await chai.request(app).get('/matches')

      expect(response.status).to.equal(400)
    })
  })

  describe('next /matches updateStatus', async () => {
    before(async () => {
      Sinon.stub(Match, "findAll").rejects(new Err(400, 'next'));
    })
    after(async () => {
      Sinon.restore();
    })

    it('Verify next /matches/:id/finish updateStatus', async () => {
   
      const response = await chai.request(app).patch('/matches/46/finish')

      expect(response.status).to.equal(400)
    })
  })

  describe('next /matches updateScore', async () => {
    before(async () => {
      Sinon.stub(Match, "findByPk").rejects(new Err(400, 'next'));
    })
    after(async () => {
      Sinon.restore();
    })

    it('Verify next /matches/:id updateScore', async () => {
      const response = await chai.request(app).patch('/matches/46').send({ homeTeamGoals: 3, awayTeamGoals: 1 })

      expect(response.status).to.equal(400)
    })
  })
});