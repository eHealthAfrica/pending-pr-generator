'use strict';

const expect = require('chai').expect;
const GithubService = require('../classes/GithubService');

describe('GithubService Class', () => {
  describe('Test new GithubService constructor', () => {
    const arrRepoNames = ['LMIS-Dashboard', 'set'];
    const objGithubService = new GithubService(arrRepoNames);
    it('the second argument (arrRepoNames) is required', () => {
      expect(objGithubService.arrRepoNames).to.not.be.undefined
    });
    it('the second argument (arrRepoNames) should be and array', () => {
      expect(objGithubService.arrRepoNames).to.be.an('array')
    });
  })
})
