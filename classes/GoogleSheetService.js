class GoogleSheetService {
  constructor(objSheets, objUserAuth, strSpreadsheetId) {
    this.strSpreadsheetId = strSpreadsheetId;
    this.arrFormattedPullRequests = null;
    this.objSheets = objSheets;
    this.objUserAuth = objUserAuth;
  }

  postPullRequests(arrPullRequests) {
    this.formatPullRequests(arrPullRequests);
    this.updateSheet();
  }

  formatPullRequests(arrPullRequests) {
    this.arrFormattedPullRequests = arrPullRequests.map(pullRequest => Object.values(pullRequest));
    this.arrFormattedPullRequests = [
      ['Project', 'Date Opened', 'Opened By', 'Reviewers', 'Reviews', 'Pr-Link'],
      ...this.arrFormattedPullRequests,
    ];
  }

  updateSheet() {
    const sheets = this.objSheets({
      version: 'v4',
      auth: this.objUserAuth,
    });

    const request = {
      spreadsheetId: this.strSpreadsheetId,
      range: `Active - ${new Date().toISOString().split('T')[0]}!A1:G`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: this.arrFormattedPullRequests,
      },
    };
    sheets.spreadsheets.values.update(request, (err) => {
      if (err) {
        throw new Error('problem posting to sheet');
      }
    });
  }
}
module.exports = GoogleSheetService;
