class FeedRepository {
    public static getAll() {
        console.log("start FeedRepository getAll");

        const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = spreadSheet.getSheetByName('feeds');
        if (!sheet) {
            throw new Error("sheet is not found.");
        }
        const lastRow = sheet.getDataRange().getLastRow();
        const values = sheet.getRange(2, 1, lastRow - 1, 6).getValues();

        const feeds = values.map(
            value => new Feed(value[0], value[1], value[2], value[4])
        );

        console.log("end FeedRepository getAll");
        return feeds;
    }
}
