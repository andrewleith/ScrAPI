/// %%SYNOPSIS%%
function %%URI%%() {
    var options = %%OPTIONS%%;
    get(options.target.url, function(data) {

        var scrapedData = scrape($, data, options.target.rowSelector, options.outputMappings);
        return scrapedData;
    });
}
