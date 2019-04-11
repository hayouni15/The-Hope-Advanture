
const path = require('path')
var Flickr = require("flickrapi"),
flickrOptions = {
  api_key: process.env.APIKEY,
  secret: process.env.SECRET,
  user_id:process.env.USERID,
  permissions: process.env.PERMISSIONS,
  access_token:process.env.ACCESSTOKEN,
  access_token_secret:process.env.ACCESSTOKENSECRET
  
};
Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    // we can now use "flickr" as our API object,
    flickr.photos.search({
        user_id: flickr.options.user_id,
        page: 1,
        per_page: 500,
        text:"1555022473526a.PNG"
      }, function(err, result) {
        // result is Flickr's response
        console.log(result.photos)
      });
    // but we can only call public methods and access public data
  });
//img url is https://live.staticflickr.com/server/id_secret.jpg


  Flickr.authenticate(flickrOptions, function(error, flickr) {
      var uploadOptions = {
        photos: [{
          title: "test",
          tags: [
            "happy fox",
            "test 1"
          ],
          photo: path.join(__dirname, '../public/img/i1.jpg') 
        },{
          title: "test2",
          tags: "happy fox image \"test 2\" separate tags",
          photo:  path.join(__dirname, '../public/img/i2.jpg') 
        }]
      };
      Flickr.upload(uploadOptions, flickrOptions, function(err, result) {
        if(err) {
          return console.error(error);
        }
        console.log("photos uploaded", result);
      });
    });
  