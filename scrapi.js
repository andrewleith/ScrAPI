var scraper = require('./scrapi-scraper');
var util = require('util');
var express = require('express');

exports.CreateAPI = function(Config) {
    var app = express();
    
    for (var method in Config.methods) {
        // the elementURI version of the method overwrites the url, so we save the original here
        var originalUrl = Config.methods[method].elementURI.url;
    
        app.get('/' + method, function(req, res) {
    
            // how the hell do you check if req.query exists?
            var hasParams = false;
            for (var keys in req.query) {
                hasParams = true;
                break;
            }
    
            // if there are no parameters, use the parameterless scrape
            if (!hasParams) {
                scraper.scrape(Config.methods[method].collectionURI, Config.methods[method].outputMappings, function(err, output) {
                    res.json(output);
                }, true);    
            } else {
                // map method params to target site's query string params [TODO: support more ways of mapping params (post, routes, whatever)]
                Config.methods[method].elementURI.url = originalUrl;
    
                for (var param in req.query) {
                    Config.methods[method].elementURI.url += Config.methods[method].elementURI.inputMappings[param] + '=' + req.query[param] + '&';
                }            
                
                scraper.scrape(Config.methods[method].elementURI, Config.methods[method].outputMappings, function(err, output) {
                    res.json(output);
                }, true);    
            }
            
        });
    }
    
    
    //app.listen(3000);
    app.listen(process.env.PORT);
    console.log('Express started on port 3000');
};

