var express = require('express');
var fs = require('fs');
var app = express();
var hogan = require('hogan.js');
var request = require('request');



// var iframes = [
//     "https://www.youtube.com/embed/iAgKHSNqxa8",
//     "https://www.youtube.com/embed/mNcdlLIOdNw",
//     "https://www.youtube.com/embed/WLznqkTsRNk",
//     "https://www.youtube.com/embed/A98QTdzyZA8",
//     "https://www.youtube.com/embed/a1zDuOPkMSw",
//     "https://www.youtube.com/embed/d0CewvGVIXo",
//     "https://www.youtube.com/embed/682pOPYLueQ",
//     "https://www.youtube.com/embed/wO61D9x6lNY",
//     "https://www.youtube.com/embed/-2bqfDrtd6M"
// ];


var request = require('request');

var token = '20263b27cb491cf7f59ed84f5faf7d7cfb32b4deeb1c6e0b4705251ccad4c117';

//algorithm that builds GET url based values from interface

var visualPercentage = 55; 
var linguisticPercentage = 0;
var logicalPercentage = 0;
var resourceType = "";

if (visualPercentage >= 33) {
  resourceType += "video";
}; 
if (linguisticPercentage >= 33) {
  resourceType += "audio";
}; 
if (logicalPercentage >= 33) {
  resourceType += "homework";
}; 



//---GETS TOKEN ---
// request({
//   method: 'POST',
//   url: 'https://partner.opened.com/1/oauth/get_token',
//   headers: {
//     'Content-Type': 'application/json; charset=utf-8'
//   },
//   body: "{  \"client_id\": \"ddf17d90372621bd68210dd3428dcd8e260719a5882a50900a864828e56d9501\",  \"secret\": \"58f50cd0d4491a194576a28df70d6c29cac6b352df68537afa45bd3943eb2e7f\",  \"username\": \"jweiss\"}"
// }, function (error, response, body) {
//   console.log('Status:', response.statusCode);
//   console.log('Headers:', JSON.stringify(response.headers));
//   console.log('Response:', body);
// });

var iframes = [];

//calls Open Ed API and pushes share URL's to array
request({
  method: 'GET',
  url: 'https://private-anon-c2d294fdb-opened.apiary-proxy.com/1/resources.json/?descriptive=English&limit=10&offset=0&resource_type=video&featured=true&embeddable=true',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Bearer fd3b9bb16c867dec58058a32a32bef4d7e69700bbbfc5639cde44e734f253428'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', JSON.parse(body));

  console.log("body object 1:", JSON.parse(body).resources[0].share_url); 

  //builds array of iframe-able URL's from API response body
 
  var iframes = [];//clears array
  JSON.parse(body).resources.forEach(function(item){
    iframes.push(item.share_url);
  });


  // iframes.join("/n"); //converts array to HTML -- TODO erase?

  console.log("iframes array:", iframes); 

  // app.get('/', function(req, res, next){
  //   res.send('index', {
  //     iframes: 'boxes go here'
  //   })
  // })
});  

app.get('/:page', function(req, res) {
    var myData = {
        time: String(Date.now()),
        name: "Alec",
        iframe1: iframes[req.params.page * 3],
        iframe2: iframes[req.params.page * 3 + 1],
        iframe3: iframes[req.params.page * 3 + 2],
    };

    fs.readFile('index.html', 'utf8', function(error, data) {
        var template = hogan.compile(data);
        var renderedTemplate = template.render(myData)
        res.send(renderedTemplate);
    });
});




app.listen(3001, function() {
    console.log('Example app listening on port 3000!');
});


