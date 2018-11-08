const { expect } = require('chai');
const sinon = require('sinon');
const GithubService = require('../classes/GithubService');

describe('GithubService Class', () => {
  describe('Test new GithubService constructor', () => {
    const objGithubClient = {
      client: () => ({}),
    };
    const arrRepoNames = ['LMIS-Dashboard', 'set'];
    const objToken = {};
    const objMoment = {};
    const objGithubService = new GithubService(objGithubClient, arrRepoNames, objToken, objMoment);

    it('the first argument (objGithubClient) is required', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.objGithubClient).to.not.be.undefined;
    });

    it('the first argument (objGithubClient) should be an object', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.objGithubClient).to.be.an('object');
    });

    it('the second argument (arrRepoNames) is required', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.arrRepoNames).to.not.be.undefined;
    });

    it('the second argument (arrRepoNames) should be and array', () => {
      expect(objGithubService.arrRepoNames).to.be.an('array');
    });

    it('the third argument (token) is required', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.token).to.not.be.undefined;
    });

    it('the third argument (token) should be an object', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.token).to.be.an('object');
    });

    it('the objGithubService to have a property strAccountName', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.strAccountName).to.not.be.undefined;
    });

    it('the strAccountName property of objGithubService to be a string', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.strAccountName).to.be.a('string');
    });

    it('the objGithubService to have a property objGithub', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.objGithub).to.not.be.undefined;
    });
    it('the objGithub property of objGithubService to be an object', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.objGithub).to.be.an('object');
    });

    it('the objGithubService to have a property TIME_ZONE', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.TIME_ZONE).to.not.be.undefined;
    });

    it('the objGithub property of TIME_ZONE to be a string', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.TIME_ZONE).to.be.a('string');
    });

    it('the objGithubService to have a property DATE_TIME_FORMAT', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.DATE_TIME_FORMAT).to.not.be.undefined;
    });

    it('the objGithub property of DATE_TIME_FORMAT to be a string', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGithubService.DATE_TIME_FORMAT).to.be.a('string');
    });
  });

  describe('Test getRepositories method', () => {
    const objGithubClient = {
      client: () => ({}),
    };
    const arrRepoNames = ['LMIS-Dashboard', 'set'];
    const objToken = {};
    const objMoment = {};
    const objGithubService = new GithubService(objGithubClient, arrRepoNames, objToken, objMoment);

    it('objGithubService.getRepositories() should return an array', async () => {
      sinon.stub(objGithubService, 'getUnfilteredRepositories').callsFake(() => ([]));
      const result = await objGithubService.getRepositories();
      expect(result).to.be.a('array');
      sinon.restore();
    });

    it('objGithubService.getRepositories() should call getUnfilteredRepositories method once', async () => {
      sinon.stub(objGithubService, 'getUnfilteredRepositories').callsFake(() => ([]));
      await objGithubService.getRepositories();
      const result = objGithubService.getUnfilteredRepositories.callCount;
      expect(result).to.eq(1);
      sinon.restore();
    });
  });

  describe('Test getUnfilteredRepositories method', () => {
    const objGithubClient = {
      client: () => ({}),
    };
    const arrRepoNames = ['LMIS-Dashboard', 'set'];
    const objToken = {};
    const objMoment = {};
    const objGithubService = new GithubService(objGithubClient, arrRepoNames, objToken, objMoment);

    it('objGithubService.getUnfilteredRepositories() should return an array', async () => {
      sinon.stub(objGithubService, 'fetchPullRequests').callsFake(() => ({}));
      const result = await objGithubService.getUnfilteredRepositories();
      expect(result).to.be.a('array');
      sinon.restore();
    });
  });

  describe('Test fetchPullRequests method', () => {
    const objGithubClient = {
      client: () => ({
        repo: () => ({
          prsAsync: () => ([]),
        }),
      }),
    };
    const arrRepoNames = ['LMIS-Dashboard', 'set'];
    const objToken = {};
    const objMoment = {};
    const objGithubService = new GithubService(objGithubClient, arrRepoNames, objToken, objMoment);

    it('objGithubService.fetchPullRequests() should return an object', async () => {
      sinon.stub(objGithubService, 'getPullRequests').callsFake(() => ({}));
      const result = await objGithubService.fetchPullRequests('set');
      expect(result).to.be.a('object');
      sinon.restore();
    });
  });

  describe('Test getPullRequests method', () => {
    const objGithubClient = {
      client: () => ({
        repo: () => ({
          prsAsync: () => ([]),
        }),
      }),
    };
    const arrRepoNames = ['LMIS-Dashboard', 'set'];
    const objToken = {};
    const objMoment = {};
    const objGithubService = new GithubService(objGithubClient, arrRepoNames, objToken, objMoment);

    it('objGithubService.getPullRequests() should return an object', async () => {
      sinon.stub(objGithubService, 'getReviewDetails').callsFake(() => ({}));
      const result = await objGithubService.getPullRequests('set', []);
      expect(result).to.be.a('object');
      sinon.restore();
    });

    it('objGithubService.getPullRequests() should return {} if getReviewDetails returns error',
      async () => {
        sinon.stub(objGithubService, 'getReviewDetails').callsFake(() => (new Error('something bad')));
        const result = await objGithubService.getPullRequests('set', []);
        expect(result).to.be.a('object');
        sinon.restore();
      });
  });

  describe('Test getReviewDetails method', () => {
    const objGithubClient = {
      client: () => ({
        repo: () => ({
          prsAsync: () => ([]),
        }),
        pr: () => ({
          reviewsAsync: () => ({}),
        }),
      }),
    };
    const arrRepoNames = ['LMIS-Dashboard', 'set'];
    const objToken = {};
    const objMoment = {};
    const objGithubService = new GithubService(objGithubClient, arrRepoNames, objToken, objMoment);

    it('objGithubService.getReviewDetails() should return an object', async () => {
      sinon.stub(objGithubService, 'getReviews').callsFake(() => ({}));
      const result = await objGithubService.getReviewDetails('set', {});
      expect(result).to.be.a('object');
      sinon.restore();
    });
  });

  describe('Test getReviews method', () => {
    const objGithubClient = {
      client: () => ({
        repo: () => ({
          prsAsync: () => ([]),
        }),
        pr: () => ({
          reviewsAsync: () => ({}),
        }),
      }),
    };
    const arrRepoNames = ['LMIS-Dashboard', 'set'];
    const objToken = {};
    const objMoment = {};
    const objGithubService = new GithubService(objGithubClient, arrRepoNames, objToken, objMoment);

    it('objGithubService.getReviews() should return a string', async () => {
      sinon.stub(objGithubService, 'formatReview').callsFake(() => (''));
      const result = await objGithubService.getReviews({}, {});
      expect(result).to.be.a('string');
      sinon.restore();
    });
  });

  describe('Test getPullRequest method', () => {
    const objGithubClient = {
      client: () => ({
        repo: () => ({
          prsAsync: () => ([]),
        }),
        pr: () => ({
          reviewsAsync: () => ({}),
        }),
      }),
    };
    const arrRepoNames = ['LMIS-Dashboard', 'set'];
    const objToken = {};
    const objMoment = {};
    const objGithubService = new GithubService(objGithubClient, arrRepoNames, objToken, objMoment);
    const strRepoName = 'set';
    const objPullRequest = {
      created_at: new Date().toISOString(),
      user: {
        login: '',
      },
      requested_reviewers: [{ login: '' }],
      html_url: '',
    };
    const objAllReviews = {};

    it('objGithubService.getPullRequest() should return an object', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      expect(result).to.be.an('object');
    });

    it('objGithubService.getPullRequest() should return an object with property project', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      // eslint-disable-next-line no-unused-expressions
      expect(result.project).to.not.be.undefined;
    });

    it('objGithubService.getPullRequest() should return an object with property project as a string', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      // eslint-disable-next-line no-unused-expressions
      expect(result.project).to.be.a('string');
    });

    it('objGithubService.getPullRequest() should return an object with property created_at', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      // eslint-disable-next-line no-unused-expressions
      expect(result.created_at).to.not.be.undefined;
    });

    it('objGithubService.getPullRequest() should return an object with property created_at as a string', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      // eslint-disable-next-line no-unused-expressions
      expect(result.created_at).to.be.a('string');
    });

    it('objGithubService.getPullRequest() should return an object with property opened_by', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      // eslint-disable-next-line no-unused-expressions
      expect(result.opened_by).to.not.be.undefined;
    });

    it('objGithubService.getPullRequest() should return an object with property opened_by as a string', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      // eslint-disable-next-line no-unused-expressions
      expect(result.opened_by).to.be.a('string');
    });

    it('objGithubService.getPullRequest() should return an object with property reviewers', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      // eslint-disable-next-line no-unused-expressions
      expect(result.reviewers).to.not.be.undefined;
    });

    it('objGithubService.getPullRequest() should return an object with property reviewers as a string', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      // eslint-disable-next-line no-unused-expressions
      expect(result.reviewers).to.be.a('string');
    });

    it('objGithubService.getPullRequest() should return an object with property reviews', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      // eslint-disable-next-line no-unused-expressions
      expect(result.reviews).to.not.be.undefined;
    });

    it('objGithubService.getPullRequest() should return an object with property reviews as an object', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      // eslint-disable-next-line no-unused-expressions
      expect(result.reviews).to.be.an('object');
    });

    it('objGithubService.getPullRequest() should return an object with property pr_link', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      // eslint-disable-next-line no-unused-expressions
      expect(result.pr_link).to.not.be.undefined;
    });

    it('objGithubService.getPullRequest() should return an object with property pr_link as a string', async () => {
      const result = await objGithubService.constructor
        .getPullRequest(strRepoName, objPullRequest, objAllReviews);
      // eslint-disable-next-line no-unused-expressions
      expect(result.pr_link).to.be.a('string');
    });
  });
});
