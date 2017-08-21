var request = require('request');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var exportKeys = require("./keys.js");

var args = process.argv;

// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred 
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
//   console.log('body:', body); // Print the HTML for the Google homepage. 
// });


//IF USER TYPED spotify-this-song
if (args[2]==="spotify-this-song"){


 var spotify = new Spotify({
 id: exportKeys.spotifyKeys.client_id,
 secret: exportKeys.spotifyKeys.client_secret
});

//IF THE USER MADE A SONG CHOICE 
if(args[3] !== undefined) {

  spotify.search({ type: 'track', query: args[3] }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
   
   var findSong = "";
   var songIndex = 0;
   var wasSongFound = false;
   for (var i = 0; i < data.tracks.items.length; i++) {
    
   
       if(data.tracks.items[i].name === args[3]){
         
         findSong = "exact song name found! Name of Song: "
         songIndex = i;
         wasSongFound=true;
       }
   
     
   
     
   }
   
   if(wasSongFound === false){
     var findSong = "Exact song name not found, but here's the closest thing I found: ";
   }
   
   
   var artistsArray = []
   for (var i = 0; i < data.tracks.items[songIndex].artists.length; i++) {
     artistsArray.push(data.tracks.items[songIndex].artists[i].name);
     
   }
   
   console.log(findSong + data.tracks.items[songIndex].name);
   console.log("Artists(s): " + artistsArray);
   console.log("Link: " + data.tracks.items[songIndex].external_urls.spotify);
   console.log("Album: " + data.tracks.items[songIndex].album.name);
   });

}else {   // DEFAULT CHOICE 

  spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
   
   var findSong = "";
   var songIndex = 0;
   var wasSongFound = false;
   for (var i = 0; i < data.tracks.items.length; i++) {
    
   
       if(data.tracks.items[i].name === "The Sign"){
         
         findSong = "No song choice was made, default song chosen! Name of Song: "
         songIndex = i;
         wasSongFound=true;
       }
   
     
   
     
   }
   
   if(wasSongFound === false){
     var findSong = "Exact song name of default not found, but here's the closest thing I found: ";
   }
   
   
   var artistsArray = []
   for (var i = 0; i < data.tracks.items[songIndex].artists.length; i++) {
     artistsArray.push(data.tracks.items[songIndex].artists[i].name);
     
   }
   
   console.log(findSong + data.tracks.items[songIndex].name);
   console.log("Artists(s): " + artistsArray);
   console.log("Link: " + data.tracks.items[songIndex].external_urls.spotify);
   console.log("Album: " + data.tracks.items[songIndex].album.name);
   });

}


}



//IF USER TYPES my-tweets

if (args[2]==="my-tweets"){
 
var client = new Twitter({
  consumer_key: exportKeys.twitterKeys.consumer_key,
  consumer_secret: exportKeys.twitterKeys.consumer_secret,
  access_token_key: exportKeys.twitterKeys.access_token_key,
  access_token_secret: exportKeys.twitterKeys.access_token_secret
});
 
var params = {screen_name: 'tgwalker93'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    
   for(i=0; i<20; i++){
    console.log("tweet: " + tweets[i].text + "---------- Created at: " + tweets[i].created_at);
   } 
  }
});

}