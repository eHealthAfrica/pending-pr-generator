const moment = require('moment');
const Promise = require('bluebird');
const github = require('octonode');
const {
  google,
} = require('googleapis');
const GoogleSpreadsheet = require('google-spreadsheet');
const GithubService = require('./classes/GithubService');
const GoogleSheetService = require('./classes/GoogleSheetService');
const {
  repos,
  githubToken,
  sheetAuth,
  sheetId,
} = require('./config.json');

async function main() {
  const doc = Promise.promisifyAll(new GoogleSpreadsheet(sheetId));

  const objGoogleAuthentication = new google.auth.JWT(
    sheetAuth.client_email,
    null,
    sheetAuth.private_key,
    'https://www.googleapis.com/auth/spreadsheets',
  );

  const githubService = new GithubService(github, repos, githubToken, moment);
  const googleSheetService = new GoogleSheetService(
    google.sheets, objGoogleAuthentication, sheetId, doc, sheetAuth,
  );
  // Returns the GID
  await googleSheetService.makeSheet();
  const getPullRequests = await githubService.getRepositories();
  await googleSheetService.postPullRequests(getPullRequests);
}

main();
