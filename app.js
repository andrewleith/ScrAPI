var scraper = require('./scrapi-scraper');
var util = require('util');
var express = require('express');
var app = express();
/// Gets a list of all news stories on wired.com.
app.get('/listings', function(req, res) {

    var options = {"doc_synopsis":"Gets a list of all news stories on wired.com.","verb":"GET","outputMappings":{"title":{"selector":"h2 a","accessor":"text","doc_description":"Title of news story"},"link":{"selector":"h2 a","accessor":["attr",["href"]],"doc_description":"Link to news story"},"tagline":{"selector":"h5","accessor":"text","doc_description":"Tagline of news story"}},"target":{"url":"http://www.wired.com","verb":"GET","rowSelector":".headline1, .headline2"}};
   
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


/// Gets a the full text from an individual story on wired.com.
app.get('/listing', function(req, res) {

    var options = {"doc_synopsis":"Gets a the full text from an individual story on wired.com.","verb":"GET","outputMappings":{"fullText":{"selector":"div.entry","accessor":"text","doc_description":"Full Story"}},"target":{"url":"http://www.wired.com/2014/07/whats-up-with-the-other-line-is-always-faster/","verb":"GET","rowSelector":"article"}};
   
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

app.listen(3000);
console.log('ScrAPI started on port 3000');