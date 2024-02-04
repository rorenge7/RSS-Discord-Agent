class ChannelRepository {
    public static getAll() {
        console.log("start ChannelRepository getAll");

        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('channels');
        if (!sheet) {
            throw new Error("sheet is not found.");
        }
        const lastRow = sheet.getDataRange().getLastRow();
        const values = sheet.getRange(2, 1, lastRow - 1, 2).getValues();

        const channels = values.map(value => new Channel(value[0], value[1]));
        console.log("end ChannelRepository getAll");

        return channels;
    }
}
