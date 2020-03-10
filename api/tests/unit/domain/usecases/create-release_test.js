const { expect, sinon } = require('../../../test-helper');
const domainBuilder = require('../../../tooling/domain-builder/factory');
const createRelease = require('../../../../lib/domain/usecases/create-release');

describe('Unit | UseCase | Create Release', () => {
  let datasources;
  let result;
  let expectedCreatedRelease;

  beforeEach(async () => {
    expectedCreatedRelease = {
      id: '2020-03-02:fr',
      content: domainBuilder.buildRelease()
    };

    datasources = {
      areaDatasource: {
        list: sinon.spy(async () => expectedCreatedRelease.content.areas)
      },
      competenceDatasource: {
        list: sinon.spy(async () => expectedCreatedRelease.content.competences)
      },
      challengeDatasource: {
        list: sinon.spy(async () => expectedCreatedRelease.content.challenges)
      },
      tubeDatasource: {
        list: sinon.spy(async () => expectedCreatedRelease.content.tubes)
      },
      courseDatasource: {
        list: sinon.spy(async () => expectedCreatedRelease.content.courses)
      },
      skillDatasource: {
        list: sinon.spy(async () => expectedCreatedRelease.content.skills)
      },
      tutorialDatasource: {
        list: sinon.spy(async () => expectedCreatedRelease.content.tutorials)
      },
    };

    // when
    result = await createRelease(datasources);
  });

  it('should retrieve area from repository', async () => {
    // then
    expect(datasources.areaDatasource.list).to.be.called;
  });

  it('should retrieve competences from repository', async () => {
    // then
    expect(datasources.competenceDatasource.list).to.be.called;
  });

  it('should retrieve challenges from repository', async () => {
    // then
    expect(datasources.challengeDatasource.list).to.be.called;
  });

  it('should retrieve tubes from repository', async () => {
    // then
    expect(datasources.tubeDatasource.list).to.be.called;
  });

  it('should retrieve courses from repository', async () => {
    // then
    expect(datasources.courseDatasource.list).to.be.called;
  });

  it('should retrieve skills from repository', async () => {
    // then
    expect(datasources.skillDatasource.list).to.be.called;
  });

  it('should retrieve tutorials from repository', async () => {
    // then
    expect(datasources.tutorialDatasource.list).to.be.called;
  });

  it('should return created release with id and content', async () => {
    // then
    expect(result).to.deep.equal(expectedCreatedRelease);
  });
});