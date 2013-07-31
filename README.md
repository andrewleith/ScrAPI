# ScrAPI
ScrAPI (pronounced scray pee eye, like API) allows you to expose data from any website as an API.


## What it does
Under the hood, ScrAPI creates your API using express.  It will generate the API code for you and you can use it as is, or add more functionality to it by editing the code. To scrape the data it uses node.io. By adding a few documentation objects to your configuration, it can also generate full API documentation in markdown.


## How it works
ScrAPI gets you to define collection and element URIs which make up your API. You can add query parameters to do things like filtering or searching. For each resource of your API, you define how it scrapes your target site.

To get the data from your target website, you'll specify selectors (using node.io's conventions) to scrape out the exact data you need.  
You'll also map these data to fields that will be output by your method in JSON.


## An example configuration

For example, say you wanted to display job postings from a URL, `http://jobs/alljobs`. You might want to create a collection URI named named 
`listings`. You'd start by defining your method and indicating the URL to scrape from:

```JSON
Config = {
  methods: {
    'listings': {
      verb: 'GET',
      target: {
        url: 'http://jobs/alljobs',
        verb: 'GET',
        ...
      }
      ...
    }
  }
};
```

If you want it to return fields called `JobID` and `JobTitle`, you'll need to tell ScrAPI how to find that data by 
defining the selectors that will scrape the it. Adding this within your method configuration gives you:

```JSON
Config = {
  methods: {
    'listings': {
      verb: 'GET',
      target: {
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
```
      
If you don't need to pass any sort of parameters, you're good to go. Run scrapijs [our configuration file].

## Example with parameters

Here's an example that makes the listings URI able to do a search if parameters are provided. You'll need to define the parameters, and then map them to the site you're scraping from.  Let's say our job site has a search function we can access using  `http://jobs/jobsearch?title=x`.  We will want to map an input of our method, named `JobTitle` (for consistency's sake), to the query parameter on the jobs site, `title`:

```JSON
Config = {
  methods: {
    'listings': {
      verb: 'GET',
      target: {
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
```
