//data.js
//require the Elasticsearch librray
const elasticsearch = require('elasticsearch');
// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});
// ping the client to be sure Elasticsearch is up
client.ping({
     requestTimeout: 30000,
 }, function(error) {
 // at this point, eastic search is down, please check your Elasticsearch service
     if (error) {
         console.error('Elasticsearch cluster is down!');
     } else {
         console.log('Everything is ok');
     }
 });

// Create new index
 client.indices.create({
  index: 'electronics',
  body: {
    mappings: {
      product: {
        properties: {
          binding: { type: "text" },
          brand: { type: "text" },
          features: { type: "text" },
          title: { type: "text" }
        }
      }
    }
  }
}, function(error, response, status) {
  if (error) {
      console.log(error);
  } else {
      console.log("created a new index", response);
  }
});

const items = require('./electronics.json');
var bulk = [];
items.forEach(item =>{
   bulk.push({
    index: {
          _index:"electronics",
          _type:"product",
    }
  });
  bulk.push(item);
})

//perform bulk indexing of the data passed
client.bulk({ body : bulk }, function( err, response ){
         if( err ){
             console.log("Failed Bulk operation".red, err)
         } else {
             console.log("Successfully imported %s".green, items.length);
         }
});

