module.exports = function($, data, rowSelector, outputMappings) {
    var rows = [];

    console.log('selector: ' + rowSelector);

    $(rowSelector, data).each(function (i, elem) {
        var row = {};
        var lastId;

        for (var col in outputMappings) {
            var selector = outputMappings[col].selector;
            var accessor = outputMappings[col].accessor;

            console.log('scraping: ' + selector);
            console.log('accessor: ' + accessor);

            var data;
            // if the accessor is an array, run the first argument as a function and the rest as params
            if (accessor instanceof Array) {
                console.log('accessor is array: ' + accessor);
                obj = $(this).find(selector);
                data = obj[accessor[0]].apply(obj, accessor[1]); //["attribs.href"]; 
            }
            else {
                data = $(this).find(selector)[accessor](); //["attribs.href"]; 
            }

            console.log("d: " + data);

            row[col] = data;
        }

        rows.push(row);
    });

    console.log(rows);  
    return rows;
};