const { expect } = require('chai');
const sinon = require('sinon');
const GoogleSheetService = require('../classes/GoogleSheetService');

describe('GoogleSheetClass', () => {
  describe('constructor', () => {
    const objSheets = {};
    const objUserAuth = {};
    const strSpreadSheetId = '';
    const objGoogleSheet = new GoogleSheetService(objSheets, objUserAuth, strSpreadSheetId);

    it('first argument objSheets must be defined', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGoogleSheet.objSheets).to.not.be.undefined;
    });

    it('objGoogleSheet.objSheets must be an object', () => {
      expect(objGoogleSheet.objSheets).to.be.an('object');
    });

    it('second argument objUserAuth must be defined', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGoogleSheet.objUserAuth).to.not.be.undefined;
    });

    it('objGoogleSheet.objUserAuth must be an object', () => {
      expect(objGoogleSheet.objUserAuth).to.be.an('object');
    });

    it('third argument strSpreadsheetId must be defined', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGoogleSheet.strSpreadsheetId).to.not.be.undefined;
    });

    it('objGoogleSheet.strSpreadsheetId must be an string', () => {
      expect(objGoogleSheet.strSpreadsheetId).to.be.a('string');
    });

    it('objGoogleSheet.arrFormattedPullRequests must be defined', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(objGoogleSheet.arrFormattedPullRequests).to.not.be.undefined;
    });
  });

  describe('postPullRequest', () => {
    const objSheets = {};
    const objUserAuth = {};
    const strSpreadSheetId = '';
    const objGoogleSheet = new GoogleSheetService(objSheets, objUserAuth, strSpreadSheetId);

    it('objGoogleSheet.postPullRequest to return undefined', () => {
      sinon.stub(objGoogleSheet, 'formatPullRequests').callsFake(() => {});
      sinon.stub(objGoogleSheet, 'updateSheet').callsFake(() => {});
      const arrPullRequests = [];
      const result = objGoogleSheet.postPullRequests(arrPullRequests);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.undefined;
      sinon.restore();
    });

    it('objGoogleSheet.postPullRequest should call objGoogleSheet.formatPullRequests once', () => {
      sinon.stub(objGoogleSheet, 'formatPullRequests').callsFake(() => {});
      sinon.stub(objGoogleSheet, 'updateSheet').callsFake(() => {});
      const arrPullRequests = [];
      objGoogleSheet.postPullRequests(arrPullRequests);
      expect(objGoogleSheet.formatPullRequests.callCount).to.eq(1);
      sinon.restore();
    });

    it('objGoogleSheet.postPullRequest should call objGoogleSheet.updateSheet once', () => {
      sinon.stub(objGoogleSheet, 'formatPullRequests').callsFake(() => {});
      sinon.stub(objGoogleSheet, 'updateSheet').callsFake(() => {});
      const arrPullRequests = [];
      objGoogleSheet.postPullRequests(arrPullRequests);
      expect(objGoogleSheet.updateSheet.callCount).to.eq(1);
      sinon.restore();
    });
  });
  describe('formatPullRequests', () => {
    const objSheets = {};
    const objUserAuth = {};
    const strSpreadSheetId = '';
    const objGoogleSheet = new GoogleSheetService(objSheets, objUserAuth, strSpreadSheetId);

    it('objGoogleSheet.formatPullRequests should return undefined', () => {
      const arrPullRequests = [];
      const result = objGoogleSheet.formatPullRequests(arrPullRequests);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.undefined;
    });

    it('objGoogleSheet.arrFormattedPullRequests should be an array', () => {
      const arrPullRequests = [];
      objGoogleSheet.formatPullRequests(arrPullRequests);
      const result = objGoogleSheet.arrFormattedPullRequests;
      expect(result).to.be.an('array');
    });
  });
});
