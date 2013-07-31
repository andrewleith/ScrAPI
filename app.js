var scraper = require('./scrapi-scraper');
var util = require('util');
var express = require('express');
var app = express();
app.get('/listings', function(req, res) {

    var options = {"verb":"GET","outputMappings":{"title":{"selector":"h1 a","accessor":"text()","doc_description":"Title of news story"},"category":{"selector":"h5","accessor":"text()","doc_description":"Category of news story"}},"doc_synopsis":"Gets a list of all current house listings based on any of the following optional parameters. They keywords search is a contains type searches and not exact matches.","target":{"url":"http://www.wired.com","verb":"GET","rowSelector":".headline1, .headline2"}};
    // how the hell do you check if req.query exists?
    var hasParams = false;
    for (var keys in req.query) {
        hasParams = true;
        break;
    }
   
    // map method params to target site's query string params [TODO: support more ways of mapping params (post, routes, whatever)]
    if (options.inputMappings) {
        for (var param in req.query) {
            options.url += options.inputMappings[param] + '=' + req.query[param] + '&';
        }            
    }
    
    scraper.scrape(options.target, options.outputMappings, function(err, output) {
        res.json(output);
    }, true);    

});app.listen(3000);
console.log('ScrAPI started on port 3000');