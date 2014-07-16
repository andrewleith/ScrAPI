var http = require('http');
var util = require('util');
var cheerio = require('cheerio');

exports.scrape = function (scrapeOptions, outputMappings, callback) {      
      http.get(scrapeOptions.url, function(res) {

        console.log('scraping ' + scrapeOptions.url)
        var $;
        var data = '';
        res.on('data', function(chunk) {
          data += chunk;
        });

        // use cheerio for actual scraping
        res.on('end', function() {
          $ = cheerio.load(data);

          // get all the listings on the page
          var rows = [];

          console.log('selector: ' + scrapeOptions.rowSelector);
          $(scrapeOptions.rowSelector).each(function(i, elem) {
            var row = {};
            var lastId;

            for (var col in outputMappings)
            { 
              console.log('scraping: ' + outputMappings[col].selector);
              console.log('accessor: ' + outputMappings[col].accessor);

              var data;
              // if the accessor is an array, run the first argument as a function and the rest as params
              if (outputMappings[col].accessor instanceof Array) {
                console.log('accessor is array: ' + outputMappings[col].accessor);
                obj = $(this).find(outputMappings[col].selector);
                data = obj[outputMappings[col].accessor[0]].apply(obj, outputMappings[col].accessor[1]); //["attribs.href"]; 
              }
              else {
                data = $(this).find(outputMappings[col].selector)[outputMappings[col].accessor](); //["attribs.href"]; 
              }
             
              console.log("d: " + data);
              row[col] = data;

                
              //}
              //catch (e)
              //{

              //}
            }
            rows.push(row);
          });
        });

      }).on('error', function() {
         console.log("Unable to parse site:");
      });
};

