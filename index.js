const moment = require('moment');
const github = require('octonode');
const { google } = require('googleapis');
const GithubService = require('./classes/GithubService');
const GoogleSheetService = require('./classes/GoogleSheetService');
const {
  repos,
  githubToken,
  sheetAuth,
  sheetId,
} = require('./config.json');

async function main() {
  const objGoogleAuthentication = new google.auth.JWT(
    sheetAuth.client_email, null,
    sheetAuth.private_key,
    'https://www.googleapis.com/auth/spreadsheets',
  );
  const githubService = new GithubService(github, repos, githubToken, moment);
  const googleSheetService = new GoogleSheetService(
    google.sheets,
    objGoogleAuthentication,
    sheetId,
  );
  const getPullRequests = await githubService.getRepositories();

  Promise.all(getPullRequests).then((arrPullRequests) => {
    googleSheetService.postPullRequests(arrPullRequests);
  });
}

main();
