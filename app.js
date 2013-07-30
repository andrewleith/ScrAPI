var scraper = require('./scrapi');

var Config = {
    methods: {
        'listings': {
            verb: 'GET',
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
            doc_synopsis: "Gets a list of all current house listings based on any of the following optional parameters. They keywords search is a contains type searches and not exact matches.",
            collectionURI: {
                url: 'http://grapevine.ca/search-results/classic?',
                verb: 'GET',
                rowSelector: '.views-row',
            },
            elementURI: {
                url: 'http://grapevine.ca/search-results/classic?',
                verb: 'GET',
                rowSelector: '.views-row',
                inputMappings: {
                    'beds': 'field_listing_bedrooms_value'
                }
            }
        }
    }
};

scraper.CreateAPI(Config);


