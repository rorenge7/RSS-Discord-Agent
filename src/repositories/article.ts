class ArticleRepository {
    public static getAll(feed: Feed) {
        console.log("start ArticleRepository getAll");
        const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
        const articleSheet = spreadSheet.getSheetByName(feed.sheetID);
        if (!articleSheet) {
            throw new Error(`article sheet is not found. sheetID: ${feed.sheetID}.`);
        }
        const lastRow = articleSheet?.getDataRange().getLastRow();
        const values = articleSheet.getRange(2, 1, lastRow - 1, 3).getValues();
        console.log("end ArticleRepository getAll");
        return values.map(value => new Article(value[0], value[1], new Date(value[2])));
    }
}
