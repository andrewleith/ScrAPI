/// Gets a list of all news stories on wired.com.
function listings() {
    var options = {"doc_synopsis":"Gets a list of all news stories on wired.com.","verb":"GET","outputMappings":{"title":{"selector":"h2 a","accessor":"text","doc_description":"Title of news story"},"link":{"selector":"h2 a","accessor":["attr",["href"]],"doc_description":"Link to news story"},"tagline":{"selector":"h5","accessor":"text","doc_description":"Tagline of news story"}},"target":{"url":"http://www.wired.com","verb":"GET","rowSelector":".headline1, .headline2"}};
    get(options.target.url, function(data) {

        var scrapedData = scrape($, data, options.target.rowSelector, options.outputMappings);
        return scrapedData;
    });
}
/// Gets a the full text from an individual story on wired.com.
function listing() {
    var options = {"doc_synopsis":"Gets a the full text from an individual story on wired.com.","verb":"GET","outputMappings":{"fullText":{"selector":"div.entry","accessor":"text","doc_description":"Full Story"}},"target":{"url":"http://www.wired.com/2014/07/whats-up-with-the-other-line-is-always-faster/","verb":"GET","rowSelector":"article"}};
    get(options.target.url, function(data) {

        var scrapedData = scrape($, data, options.target.rowSelector, options.outputMappings);
        return scrapedData;
    });
}
