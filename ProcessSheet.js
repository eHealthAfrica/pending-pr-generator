const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async').series;

module.exports = (sheetId, sheetAuth) => {
  const todayDate = new Date();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(new Date().getDate() - 1);

  const doc = new GoogleSpreadsheet(sheetId);
  async(
    [
      function setAuth(step) {
        const creds = {
          client_email: sheetAuth.client_email,
          private_key: sheetAuth.private_key,
        };
        doc.useServiceAccountAuth(creds, step);
      },
      (step) => {
        doc.getInfo((err, info) => {
          const yesterdaySheet = info.worksheets.find(currentSheet => currentSheet.title === `Active - ${yesterdayDate.toISOString().split('T')[0]}`);
          const todaySheet = info.worksheets.find(currentSheet => currentSheet.title === `Active - ${todayDate.toISOString().split('T')[0]}`);
          if (yesterdaySheet) yesterdaySheet.setTitle(`Outdated - ${yesterdayDate.toISOString().split('T')[0]}`);
          if (!todaySheet) {
            const newWorksheetTitle = `Active - ${todayDate.toISOString().split('T')[0]}`;
            doc.addWorksheet({ title: newWorksheetTitle });
          }
          step();
        });
      },
    ],
    (err) => {
      if (err) {
        throw new Error(err.message);
      }
    },
  );
};
