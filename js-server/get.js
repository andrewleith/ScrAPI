var http = require('http');
var util = require('util');

module.exports = function (url, callback) {      
      http.get(url, function(res) {

        console.log('scraping ' + url)
        var data = '';
        res.on('data', function(chunk) {
          data += chunk;
        });

        // use cheerio for actual scraping
        res.on('end', function() {
          callback(data);
        });

      }).on('error', function() {
         console.log("Unable to parse site:");
      });
};

