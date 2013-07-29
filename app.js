var scraper = require('./scraper-outline');
var util = require('util');

var express = require('express');

var app = express();

Config = {
    methods: {
        'listings': {
            verb: 'GET',
            targetNoParams: {
                url: 'http://grapevine.ca/search-results/classic?',
                verb: 'GET',
                rowSelector: '.views-row',
                outputMappings: {  
                    'id': {
                        selector: '.views-field-title a',
                        accessor: 'text'
                    },
                    'shortdesc': {
                        selector: 'views-field-field-listing-misc-label .field-content',
                        accessor: 'text'
                    },
                    'bedrooms': {
                        selector: '.views-field-field-listing-bedrooms .field-content',
                        accessor: 'text'
                    },
                    'bathrooms': {
                        selector: '.views-field-field-listing-bathrooms .field-content',
                        accessor: 'text'
                    },
                    'price': {
                        selector: '.views-field-field-listing-sale-price .field-content',
                        accessor: 'text'
                    },
                    'address': {
                        selector: '.views-field-field-listing-address .field-content',
                        accessor: 'text'
                    },
                    'openhouse': {
                        selector: '.views-field-field-listing-open-house .field-content',
                        accessor: 'text'
                    },
                    'description': {
                        selector: '.views-field-body .field-content',
                        accessor: 'text'
                    }
                }
            },
            targetWithParams: {
                url: 'http://grapevine.ca/search-results/classic?',
                verb: 'GET',
                rowSelector: '.views-row',
                outputMappings: {  
                    'id': {
                        selector: '.views-field-title a',
                        accessor: 'text'
                    },
                    'shortdesc': {
                        selector: 'views-field-field-listing-misc-label .field-content',
                        accessor: 'text'
                    },
                    'bedrooms': {
                        selector: '.views-field-field-listing-bedrooms .field-content',
                        accessor: 'text'
                    },
                    'bathrooms': {
                        selector: '.views-field-field-listing-bathrooms .field-content',
                        accessor: 'text'
                    },
                    'price': {
                        selector: '.views-field-field-listing-sale-price .field-content',
                        accessor: 'text'
                    },
                    'address': {
                        selector: '.views-field-field-listing-address .field-content',
                        accessor: 'text'
                    },
                    'openhouse': {
                        selector: '.views-field-field-listing-open-house .field-content',
                        accessor: 'text'
                    },
                    'description': {
                        selector: '.views-field-body .field-content',
                        accessor: 'text'
                    }
                },
                inputMappings: {
                    'beds': 'field_listing_bedrooms_value'
                }
            }
        }
    }
};

for (var method in Config.methods) {
    // the parameter version of the method overwrites the url, so we save the original here
    var originalUrl = Config.methods[method].targetWithParams.url;

    app.get('/' + method, function(req, res) {

        // how the hell do you check if req.query exists?
        var hasParams = false;
        for (var keys in req.query) {
            hasParams = true;
            break;
        }

        // if there are no parameters, use the parameterless scrape
        if (!hasParams) {
            scraper.scrape(Config.methods[method].targetNoParams, function(err, output) {
                res.json(output);
            }, true);    
        } else {
            // map method params to target site's query string params [TODO: support more ways of mapping params (post, routes, whatever)]
            Config.methods[method].targetWithParams.url = originalUrl;

            for (var param in req.query) {
                Config.methods[method].targetWithParams.url += Config.methods[method].targetWithParams.inputMappings[param] + '=' + req.query[param] + '&';
            }            
            
            scraper.scrape(Config.methods[method].targetWithParams, function(err, output) {
                res.json(output);
            }, true);    
        }
        
    });
}
// GET /listings 
// returns all listings
// optional filter parameters: id, shortdesc, bedrooms, bathrooms, price_max, price_min, address, description
// app.get('/listings', function(req, res){

//     // parse query string into JSON
//     var params = {};
//     for (var param in req.query) {
//         params[param] = req.query[param];
//     }

//     scraperOptions = {
//         url: 'http://grapevine.ca/search-results/classic?',
//         verb: 'GET',
//         rowSelector: '.views-row',
//         outputMappings: {  
//             'id': {
//                 selector: '.views-field-title a',
//                 accessor: 'text'
//             },
//             'shortdesc': {
//                 selector: 'views-field-field-listing-misc-label .field-content',
//                 accessor: 'text'
//             },
//             'bedrooms': {
//                 selector: '.views-field-field-listing-bedrooms .field-content',
//                 accessor: 'text'
//             },
//             'bathrooms': {
//                 selector: '.views-field-field-listing-bathrooms .field-content',
//                 accessor: 'text'
//             },
//             'price': {
//                 selector: '.views-field-field-listing-sale-price .field-content',
//                 accessor: 'text'
//             },
//             'address': {
//                 selector: '.views-field-field-listing-address .field-content',
//                 accessor: 'text'
//             },
//             'openhouse': {
//                 selector: '.views-field-field-listing-open-house .field-content',
//                 accessor: 'text'
//             },
//             'description': {
//                 selector: '.views-field-body .field-content',
//                 accessor: 'text'
//             }
//         }
//     };

//     scraper.listings(scraperOptions, params, function(err, output) {
//         //console.log(output);
//         res.json(output);      
//     }, true);

// });

// scrape google:
// scraperOptions = {
//         url: 'http://www.google.ca/search?&q=test',
//         verb: 'GET',
//         rowSelector: 'li.g',
//         outputMappings: {  
//             'title': {
//                 selector: 'h3.r a',
//                 accessor: 'text'
//             }
//         }
//     };

app.listen(3000);
console.log('Express started on port 3000');