class Feed {
    constructor(
        public name: string,
        public link: string,
        public targetChannel: string,
        public sheetID: string,
        public lastSentDate?: Date,
        public articles?: Article[]) { }
}
