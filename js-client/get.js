var get = (function get(url, callback) {
    $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22" + encodeURIComponent(url) + "%22&format=xml'&callback=?", function (data) {
        if (data.results[0]) {
            callback(data.results[0]);
        } else {
            callback({});
        }
    });
});
