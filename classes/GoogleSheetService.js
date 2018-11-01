

class GoogleSheetService {
  constructor(sheets, userAuth, strSpreadsheetId) {
    this.strSpreadsheetId = strSpreadsheetId;
    this.arrFormattedPullRequests = '';
    this.sheets = sheets;
    this.userAuth = userAuth;
  }

  postPullRequests(arrPullRequests) {
    this.arrFormattedPullRequests = arrPullRequests.map(pullRequest => Object.values(pullRequest));
    this.arrFormattedPullRequests = [
      ['Project', 'Date Opened', 'Opened By', 'Reviewers', 'Reviews', 'Pr-Link'],
      ...this.arrFormattedPullRequests,
    ];
    const auth = this.userAuth;
    this.updateSheet(auth);
  }

  updateSheet(auth) {
    const sheets = this.sheets({
      version: 'v4',
      auth,
    });

    const request = {
      spreadsheetId: this.strSpreadsheetId,
      range: 'Sheet4!A1:G',
      valueInputOption: 'RAW',
      resource: {
        values: this.arrFormattedPullRequests,
      },
    };
    sheets.spreadsheets.values.update(request, (err, res) => {
      err ? console.error('error posting to sheet') : console.log('Posted to the sheet');
    });
  }
}
module.exports = GoogleSheetService;
