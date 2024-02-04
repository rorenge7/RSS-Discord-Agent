class FeedService {
    static getAll() {
        console.log("start FeedService getAll");
        const feeds = FeedRepository.getAll();

        const spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
        feeds.forEach(feed => {
            const date = spreadSheet.getSheetByName(feed.sheetID)?.getRange(1, 3, 1, 1).getValue();
            feed.lastSentDate = new Date(date);
            feed.articles = ArticleRepository.getAll(feed);
            console.log(feed)
        })
        console.log("end FeedService getAll");
        return feeds;
    }

    static registerFeeds() {
        console.log("start FeedService registerFeeds");
        const feeds = FeedRepository.getAll();

        const spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
        feeds.filter(feed => !spreadSheet.getSheetByName(feed.sheetID)).forEach(f => {
            const sheet = spreadSheet.insertSheet(f.sheetID, 2)
            sheet.getRange(1, 1, 2, 3).setValues([
                [f.link, '=A1&"?d="&C1', (new Date(1900, 1, 1, 0, 0, 0, 0)).toString()],
                ['=IMPORTFEED(A1,"items title",false,20)', '=IMPORTFEED(A1,"items url",false,20)', '=IMPORTFEED(A1,"items created",false,20)']
            ]);
        });
        console.log("end FeedService registerFeeds");
    }

    static updateSentDate(feed: Feed, sentDate: Date) {
        console.log("start FeedService updateSentDate");

        const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
        const articleSheet = spreadSheet.getSheetByName(feed.sheetID);
        const cells = articleSheet?.getRange(1, 3, 1, 1);
        cells?.setValues([[sentDate]])
        console.log(sentDate.toString())

        console.log("end FeedService updateSentDate");
    }
}
