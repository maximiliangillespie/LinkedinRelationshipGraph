//This is the express backend that collects and sends the graph database
//data to localhost:5000/express_backend. 

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 

var cors = require('cors')
app.use(cors())

const port = process.env.PORT || 5000;
const RedisGraph = require("redisgraph.js").Graph;

// NOTE: this will crash at the moment if the wrong graph is in here.
let graph = new RedisGraph("linkedin");

var nodes = [];
var links = [];

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/backend', function(req, res) {
    (async () => {
        nodes = [];
        links = [];
        res1 = await graph.query(req.body.message); //query to return links.
        
        console.log("GRAPH RESULT: ");
        console.log(res1);

        while (res1.hasNext()) {
            let record = res1.next();
            
            nodes.push(record.get(res1._typelessHeader[0]).properties);
            nodes.push(record.get(res1._typelessHeader[1]).properties);
            links.push({source:record.get(res1._typelessHeader[0]).properties.id, target:record.get(res1._typelessHeader[1]).properties.id});
        }
    })();

    app.get('/backend', (req, res) => {
        res.send({express: {nodes:nodes, links:links}});//sending the data in the form of a dictionary object.
    });
});







