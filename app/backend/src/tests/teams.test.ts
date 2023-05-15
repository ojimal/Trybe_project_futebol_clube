import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team.model';
import { allTeamsMock } from './mocks/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('test /teams', () => {

    let chaiHttpResponse: Response;

    afterEach(() => {
        Sinon.restore();
    });

    describe('Find All Teams', () => {
        it('returns all teams in the API', async () => {
            Sinon.stub(TeamModel, 'findAll').resolves(allTeamsMock as TeamModel[]); 

            const { status, body} = await chai.request(app).get('/teams')

            expect(status).to.be.equal(200);
            expect(body).to.be.deep.equal(allTeamsMock);
        })
    })
});
