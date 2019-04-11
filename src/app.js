const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const post = require('./models/posts')
const gallery = require('./models/gallery')
const gallerylist = require('./models/gallerylist')
const subscriber = require('./models/subscribers')
const multer = require('multer')
var Flickr = require("flickrapi"),
flickrOptions = {
  api_key: process.env.APIKEY,
  secret: process.env.SECRET,
  user_id:process.env.USERID,
  permissions: process.env.PERMISSIONS,
  access_token:process.env.ACCESSTOKEN,
  access_token_secret:process.env.ACCESSTOKENSECRET
  
};
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath))
app.use(express.json())
const partialsPath = path.join(__dirname, '../views/partials')
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'The hope advanture'
    });
})
app.get('/blog', (req, res) => {
    res.render('blog', {
        title: 'The hope advanture'
    });
})
app.get('/singleBlog/:id', (req, res) => {
    const _id = req.params.id // Access the id provided
    post.findById(_id).then((article) => {
        if (!article) {
            console.log('no article')
        } else {
            try {
                post.findOneAndUpdate({
                    _id
                }, {
                    Article_views: article.Article_views + 1
                }, (res) => {
                    console.log(res)
                })
            } catch (e) {
                console.log('error', e)
            }
            console.log(article)
            res.render('SingleBlog', {
                id: _id,
                Article_topic: article.Article_topic,
                Author_name: article.Author_name,
                Article_title: article.Article_title,
                Article_picture: article.Article_picture,
                Article_content: article.Article_content,
                Article_date: article.Article_date,
                Article_views: article.Article_views + 1
            });
        }
    })

})
app.get('/topArticles', (req, res) => {
    try {
        post.find().sort({
            Article_views: -1
        }).limit(4).then((data) => {
            if (!data) {
                return res.status(400).send('No record')
            }
            res.status(200).send(data)
            console.log(data)
        })
    } catch (e) {
        console.log(e)
    }
})
app.get('/articles/:skip/:limit/:topic', (req, res) => {
    const skip = parseInt(req.params.skip)
    const limit = parseInt(req.params.limit)
    const topic = req.params.topic
    if (topic === 'all') {
        try {
            post.find().limit(limit).skip(skip).then((data) => {
                if (!data) {
                    return res.status(400).send('No record')
                }
                res.status(200).send(data)
                console.log(data)
            })
        } catch (E) {
            console.log(E)
        }
    } else {
        try {
            post.find({
                Article_topic: topic
            }).limit(limit).skip(skip).then((data) => {
                if (!data) {
                    return res.status(400).send('No record')
                }
                res.status(200).send(data)
                console.log(data)
            })
        } catch (E) {
            console.log(E)
        }
    }
})

// picture upload 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/ArticlesImages/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname[0]+'.'+file.originalname.split('.')[file.originalname.split('.').length-1])
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please uplaod and image or video'))
        }
        cb(undefined, true)
    }
})
const upload = multer({
    storage: storage
})


app.post('/uploadPic', upload.single('ArticlePicture'), (req, res) => {
    console.log(req.body)
    try {
        console.log(req.file)
        res.send({
            failure: false,
            message: ' uploaded',
            filename: req.file.originalname,
            filepath: req.file.path,
            file: req.file
        })
    } catch (E) {
        console.log(E)
        res.send({
            failure: true,
            message: 'Failed to upload pic',
            reqbody:req.body
        })
    }
})

app.post('/FlickrUpload',(req,res)=>{
console.log('ggg'+req.body)
    try{
        Flickr.authenticate(flickrOptions, function(error, flickr) {
            var uploadOptions = {
              photos: [{
                title: req.body.title,
                tags: [
                 req.body.tags
                ],
                photo: path.join(__dirname, `../public/ArticlesImages/${req.body.title}`) 
              }]
            };
            Flickr.upload(uploadOptions, flickrOptions, function(err, result) {
              if(err) {
                return console.error(error);
              }
              console.log("photos uploaded", result);
              res.send({body:req.body})
            });
          });
    }catch(E){
res.send({error:E})
    }
})
app.post('/getFlickerimages',(req,res)=>{
    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
        // we can now use "flickr" as our API object,
        console.log(';llllll',req.body.picture)
        flickr.photos.search({
            user_id: flickr.options.user_id,
            page: 1,
            per_page: 500,
            text:req.body.picture
          }, function(err, result) {
            // result is Flickr's response
            console.log('rsult' ,result.photos)
            res.send(result.photos)
          });
        // but we can only call public methods and access public data
      });
})

app.post('/uploadGallery', upload.array('GalleryPictures'), (req, res) => {
    console.log(req.body)
    console.log(req.files)
    //res.send(req.files)
    try {
        res.send({
            failure: false,
            message: ' uploaded',
            filename: req.files
        })
    } catch (E) {
        console.log(E)
        res.send({
            failure: true,
            message: 'Failed to upload pic'
        })
    }
})
app.post('/addGallery', (req, res) => {
    try {
        const newgallery = new gallery(req.body)
        console.log(req.body)
        newgallery.save().then(() => {
            res.send(newgallery)
        }).catch((e) => {
            res.status(400).send(e)
        })
    } catch (e) {
        console.log(e)
    }
})
app.post('/addGalleryList', (req, res) => {
    try {
        const newgallerylist = new gallerylist(req.body)
        console.log(req.body)
        newgallerylist.save().then(() => {
            res.send(newgallerylist)
        }).catch((e) => {
            res.status(400).send(e)
        })
    } catch (e) {
        console.log(e)
    }
})
app.get('/getGalleryList', (req, res) => {
    try {
        gallerylist.find().then((data) => {
            res.send(data)
        })
    } catch (E) {
        res.send(E)
    }
})
app.post('/getSingleGallery', (req, res) => {
    
    try {
        console.log((req.body.galleryTitle))
        gallerylist.find({Gallery_Title:req.body.galleryTitle}).then((data) => {
            res.send(data)
        })
    } catch (E) {
        res.send(E)
    }
})
app.post('/getPictures/:title',(req,res)=>{
    const title = req.params.title
    if(title==='first'){
        gallery.find().limit(9).then((data)=>{
          res.send(data)
        })
    }
    else{
        gallery.find({Gallery_Title:title}).then((data)=>{
            res.send(data)
        })
    }
    console.log(title)
})
app.post('/addPost', (req, res) => {
    try {
        const newPost = new post(req.body)
        console.log(req.body)
        newPost.save().then(() => {
            res.send(newPost)
        }).catch((e) => {
            res.status(400).send(e)
        })
    } catch (e) {
        console.log(e)
    }
})

app.get('/addPost', (req, res) => {
    res.render('CreateNewPost')
})
app.get('/addGallery', (req, res) => {
    res.render('addGallery')
})

app.post('/addSubscriber', (req, res) => {
    try {
        const newsubscriber = new subscriber(req.body)
        newsubscriber.save().then(() => {
            res.send(newsubscriber)
        }).catch((e) => {
            res.send(e)
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/singlelibrary', (req, res) => {
    res.render('SingleLibrary')
})

app.get('/library', (req, res) => {
    res.render('library');
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('running on port ', port)
})