var nodeio = require('node.io');
var util = require('util');

exports.scrape = function (scrapeOptions, outputMappings, callback) {
  var job = new nodeio.Job({
    input: [ scrapeOptions ],
    run: function (input) {

      // url to scrape
      var url = scrapeOptions.url;
      console.log('url: ' + scrapeOptions.url);       

      this.getHtml(url, function(err, $) {
        //Handle any request / parsing errors
        if (err) { 
          console.log("Unable to parse site:");
          this.exit(err);
        }

        // get all the listings on the page
        var rows = {};

        console.log('selector: ' + scrapeOptions.rowSelector);
        var results = $(scrapeOptions.rowSelector);

        // storing this as a function to work around node.io's decision not to return
        // selectors that match only 1 item as an array of 1 item (which makes .each() not 
        // work when only item is returned)
        var scraper = function(listing) {
          var row = {};
          var lastId;

          var colNumber = 0;
          for (var col in outputMappings)
          { 
            console.log('scraping: ' + outputMappings[col].selector);
            
            // if the column cant be scraped, continue anyway
            try {
              var data = $(outputMappings[col].selector,listing)[outputMappings[col].accessor]; //["attribs.href"]; 

              // remember the id so we can use it as the key
              if (colNumber === 0) { 
                lastId = data;
              }
              // store all other columns as properties
              else {
                row[col] =  data;
              } 

              rows[lastId] = row;
            }
            catch (e)
            {

            }
            colNumber++;
          }
        };

        if (results.length === undefined) {
          scraper(results);
        }
        else {
          results.each(scraper);
        }
        

        this.emit(rows);
      });
}
});
nodeio.start(job, { silent: true }, callback, true);
};

