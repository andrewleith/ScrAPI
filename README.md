ScrAPI (Scray pea eye) - expose data from any website as a RESTful(?) API 

ScrAPI creates your API using express, and scrapes the data from your target website using node.io.  
After setting up your API and running ScrAPI, you will be running your API hosted in nodejs.  It also generates full API
documentation in markdown.

----------------------------------------------------------------------------------------------------------------------------

ScrAPI allows you to define "methods" which make up your API.  If you need parameters, you can add them too.  Each method can be
defined in terms of what it does when passed no parameters or what it does when passed some parameters. You will map the parameters 
passed in to your method to parameters of your target website - the actual website you are scraping from.  

To get the data from your target website, you'll specify selectors (using node.io) to scrape out the exact data you need.  
You'll also map these data to fields that will be output by your method in JSON.

For example, say you wanted to display job postings from a URL, 'http://jobs/alljobs'. You might want a method named 'listings'. 
You'd start by defining your method and indicating the URL to scrape from:

Config = {
  methods: {
    'listings': {
      verb: 'GET',
      targetNoParams: {
        url: 'http://jobs/alljobs',
        verb: 'GET',
        ...
      }
      ...
    }
  }
};

If you want it to return fields called 'JobID' and 'JobTitle', you'll need to tell ScrAPI how to find that data by defining 
the selectors that will scrape the it. Adding this within your method configuration gives you:

Config = {
  methods: {
    'listings': {
      verb: 'GET',
      targetNoParams: {
        url: 'http://jobs/alljobs',
        verb: 'GET',
        rowSelector: '.row-data',
        outputMappings: {  
          'JobId': {
             selector: '.col-data h1 a',
             accessor: 'text'
           },
           'JobTitle': {
             selector: '.col-data h2',
             accessor: 'text'
           }
        }
      }
    }
  }
};

      
If you don't need to pass any sort of parameters, you're good to go. Run node scrapi [your configuration file].

Building from the previous configuration, here's an example that makes the listings method do a search if parameters are provided.
You'll need to define the parameters, and then map them to the site you're scraping from.  Let's say our job site has a search function 
we can access using 'http://jobs/jobsearch?title=x'.  We will want to map an input of our method, named 'JobTitle' (for consistency's sake),
to the query parameter on the jobs site, 'title':

Config = {
  methods: {
    'listings': {
      verb: 'GET',
      targetNoParams: {
        url: 'http://jobs/alljobs',
        verb: 'GET',
        rowSelector: '.row-data',
        outputMappings: {  
          'JobID': '.column-data h1 a',
          'JobTitle': '.column-data h2.text'
        }
      },
      targetWithParams: {
        url: 'http://jobs/jobsearch?',
        verb: 'GET',
        rowSelector: '.row-data',
        outputMappings: {  
          'JobID': '.column-data h1 a',
          'JobTitle': '.column-data h2.text'
        }
        inputMappings: {
          'JobTitle': 'title'
        }
      }
    }
  }
};

