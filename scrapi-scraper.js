var nodeio = require('node.io');
var util = require('util');
var cheerio = require('cheerio');

exports.scrape = function (scrapeOptions, outputMappings, callback) {
  var job = new nodeio.Job({
    input: [ scrapeOptions ],
    run: function (input) {

      // url to scrape
      var url = scrapeOptions.url;
      console.log('url: ' + scrapeOptions.url);       

      this.get(url, function(err, data) {

        $ = cheerio.load(data);
        //Handle any request / parsing errors
        if (err) { 
          console.log("Unable to parse site:");
          this.exit(err);
        }

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
            var fuck="text";
            

            console.log("d: " + data);
            row[col] = data;

              
            //}
            //catch (e)
            //{

            //}
          }
          rows.push(row);
        });



        this.emit(rows);
      });
    }
  });
nodeio.start(job, { silent: true }, callback, true);
};

