
/// %%SYNOPSIS%%
app.get('/%%URI%%', function(req, res) {

    var options = %%OPTIONS%%;
   
    // map method params to target site's query string params [TODO: support more ways of mapping params (post, routes, whatever)]
    if (options.inputMappings) {
        for (var param in req.query) {
            options.url += options.inputMappings[param] + '=' + req.query[param] + '&';
        }            
    }
    
    scraper.scrape(options.target, options.outputMappings, function(err, output) {
        res.json(output);
    }, true);    

});

