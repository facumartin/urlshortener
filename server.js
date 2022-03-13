require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns')
const URL = require('url').URL;

// Basic Configuration
const port = process.env.PORT || 3000;
var urls=[]

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:urlnumber', function(req, res){
  res.redirect(urls[parseInt(req.params.urlnumber)]);
  });

app.post("/api/shorturl/", function(req, res) {
  // Handle the data in the request
  const options = {
    all:true,
  };    
  const urlobject = new URL(req.body.url);
  
  dns.lookup(urlobject.hostname, function (err, addresses, family) {
  if (err){
      res.json({ error: 'invalid url' });
  }
  else {
      shorturl= save_url(req.body.url);
      res.json({"original_url":req.body.url,"short_url":shorturl});
  }
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

function save_url (url){
  shorturl=urls.length.toString();

  urls[shorturl]=url;
  return shorturl;
}