function index() {
    FeedService.registerFeeds()
    const feeds = FeedService.getAll();
    const channels = ChannelRepository.getAll();

    feeds.forEach(feed => {
        const targetChannels = channels.filter(c => c.id === feed.targetChannel)
        if (!targetChannels) {
            throw new Error(`channel is not found. channel: ${feed.targetChannel}`)
        }
        feed.articles?.filter(
            article => article.publishedDate.getTime() > feed.lastSentDate?.getTime()!
        ).forEach(article => {
            RestClient.post(targetChannels[0].webhookUrl, article.url, feed.name);
            Utilities.sleep(1000);
        })
        FeedService.updateSentDate(feed, new Date());
        Utilities.sleep(5000);
    })
}
