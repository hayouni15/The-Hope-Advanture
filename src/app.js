const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const post = require('./models/posts')
const subscriber = require('./models/subscribers')
const multer = require('multer')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath))
app.use(express.json())

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
                post.findOneAndUpdate({ _id }, { Article_views: article.Article_views + 1 }, (res) => {
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
        post.find().sort({Article_views :-1}).limit(4).then((data) => {
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
    }
    else {
        try {
            post.find({ Article_topic: topic }).limit(limit).skip(skip).then((data) => {
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
        cb(null, Date.now() + file.originalname)
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
            message: 'Failed to upload pic'
        })
    }
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

app.get('/library', (req, res) => {
    res.render('library');
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})