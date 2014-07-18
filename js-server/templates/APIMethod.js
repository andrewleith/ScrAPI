
/// %%SYNOPSIS%%
app.get('/%%URI%%', function(req, res) {

    var options = %%OPTIONS%%;
   
    // map method params to target site's query string params [TODO: support more ways of mapping params (post, routes, whatever)]
    if (options.inputMappings) {
        for (var param in req.query) {
            options.url += options.inputMappings[param] + '=' + req.query[param] + '&';
        }            
    }
    
    get(options.target.url, function(data) {

        var scrapedData = scrape($, data, options.target.rowSelector, options.outputMappings);
        res.json(scrapedData);
    });
});

