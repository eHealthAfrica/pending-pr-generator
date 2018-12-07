class GoogleSheetService {
  constructor(objSheets, objUserAuth, strSpreadsheetId, doc, sheetAuth) {
    this.strSpreadsheetId = strSpreadsheetId;
    this.arrFormattedPullRequests = null;
    this.objSheets = objSheets;
    this.objUserAuth = objUserAuth;

    this.sheetAuth = sheetAuth;
    this.doc = doc;
    this.previousDate = new Date();
    this.minusDays = (this.previousDate.toDateString().split(' ')[0] === 'Mon') ? 3 : 1;
    this.previousDate.setDate(new Date().getDate() - this.minusDays);
    this.newWorksheetTitle = this.constructor.formatDate('Active', new Date());
    this.oldWorksheetTitle = this.constructor.formatDate('Outdated', this.previousDate);
    this.oldActiveWorksheetTitle = this.constructor.formatDate('Active', this.previousDate);
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
      range: `${this.newWorksheetTitle}!A1:G`,
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

  makeSheet() {
    const creds = {
      client_email: this.sheetAuth.client_email,
      private_key: this.sheetAuth.private_key,
    };
    return this.doc
      .useServiceAccountAuthAsync(creds)
      .then(() => this.processWorksheet())
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  processWorksheet() {
    return this.doc
      .getInfoAsync()
      .then((info) => {
        const yesterdaySheet = info.worksheets.find(
          currentSheet => currentSheet.title === this.oldActiveWorksheetTitle,
        );
        if (yesterdaySheet) yesterdaySheet.setTitle(this.oldWorksheetTitle);
        const todaySheet = info.worksheets.find(
          currentSheet => currentSheet.title === this.newWorksheetTitle,
        );
        if (todaySheet) return this.constructor.getGID(todaySheet);
        return this.doc.addWorksheetAsync({
          title: this.newWorksheetTitle,
        }).then(data => this.constructor.getGID(data));
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  static formatDate(pre, date) {
    return `${pre} - ${new Date(date).toISOString().split('T')[0].split('-').reverse().join('/')}`;
  }

  static getGID({
    _links,
  }) {
    return _links['http://schemas.google.com/visualization/2008#visualizationApi'].split('gid=')[1];
  }
}
module.exports = GoogleSheetService;
