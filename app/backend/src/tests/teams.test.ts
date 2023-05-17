import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team.model';
import TeamsService from '../services/teams.service';
import { allTeamsMock, oneTeamMock } from './mocks/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('test /teams', () => {

    let chaiHttpResponse: Response;

    afterEach(() => {
        Sinon.restore();
    });

    describe('Find All Teams /teams GET endpoint', () => {
        it('returns all teams in the API', async () => {
            Sinon.stub(TeamModel, 'findAll').resolves(allTeamsMock as TeamModel[]); 

            const { status, body} = await chai.request(app).get('/teams')

            expect(status).to.be.equal(200);
            expect(body).to.be.deep.equal(allTeamsMock);
        })
        it('returns 404 error if teams not found', async () => {
            Sinon.stub(TeamModel, 'findAll').resolves(undefined);
      
            const response = await chai.request(app).get('/teams');
      
            expect(response.status).to.be.eq(404);
            expect(response.body).to.be.deep.eq({ message: 'Teams not found' });
          });
    })

    describe('Find by Id /teams/:id GET endpoint', async () => {

        afterEach(() => {
          Sinon.restore();
        });
    
        it('returns a team', async () => {
          Sinon.stub(TeamModel, 'findByPk').resolves(oneTeamMock as TeamModel);
    
          const response = await chai.request(app).get('/teams/1');
    
          expect(response.status).to.be.eq(200);
          expect(response.body).to.be.deep.eq(oneTeamMock);
        });
    
        it('returns 404 error if team not found', async () => {
          Sinon.stub(TeamModel, 'findByPk').resolves(null);
    
          const response = await chai.request(app).get('/teams/1');
    
          expect(response.status).to.be.eq(404);
          expect(response.body).to.be.deep.eq({ message: 'Team not found' });
        });
      }
    );
});
