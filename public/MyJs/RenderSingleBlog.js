$(document).ready(() => {
    const articleId = window.location.href.split('/')[window.location.href.split('/').length - 1]
    fetch(`/topArticles`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.

        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        referrer: "no-referrer", // no-referrer, *client
        // body data type must match "Content-Type" header
    }).then((res) => {
        console.log(res)
        return res.json()
    })
        .then((data) => {
            if (data.errors) {
                console.log(data)
            }
            else {
                console.log((Array.from(data)))
                Object.values(data).forEach((Onearticle) => {
                    fetch('/getFlickerimages', {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            "Content-Type": "application/json",
                            // "Content-Type": "application/x-www-form-urlencoded",
                        },
                        referrer: "no-referrer", // no-referrer, *client
                        body: JSON.stringify({ picture: Onearticle.Article_picture }), // body data type must match "Content-Type" header
                    }).then((res) => {
                        return res.json()
                    }).then((data) => {
                        const picURL = `https://live.staticflickr.com/${data.photo[0].server}/${data.photo[0].id}_${data.photo[0].secret}.${data.photo[0].title.split('.')[1]}`
                        console.log(picURL)
                        const $articleContainer = document.querySelector('.widget_title')
                        var articleTemplate = popularPosts
                        const html = Mustache.render(articleTemplate, { Article_title: Onearticle.Article_title, Article_content: Onearticle.Article_content, Article_topic: Onearticle.Article_topic, Author_name: Onearticle.Author_name, Article_picture: picURL, Article_date: Onearticle.Article_date, Article_views: Onearticle.Article_views, id: Onearticle._id })
                        $articleContainer.insertAdjacentHTML('afterend', html)
                        if (Onearticle._id == articleId) {
                            const $articlePicture = document.querySelector('.img-fluid')
                            $articlePicture.setAttribute('src', picURL)
                        }

                    })



                })
            }
        })
    // load comments
    var colours = [
        "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
        "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
    ]
    fetch('/getPcomment', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify({ id: window.location.href.split('/')[window.location.href.split('/').length - 1] }), // body data type must match "Content-Type" header
    }).then((res) => {
        // console.log(res)
        return res.json()
    })
        .then((data) => {
            data.forEach((comment) => {
                var color = colours[Math.floor(Math.random() * colours.length)];
                console.log(comment)
                const $commentsContainer = document.querySelector('.comments-area')
                var Pcommenttemplate = PrimComment
                const html = Mustache.render(Pcommenttemplate, { logo: comment.Comment_author[0], Comment_author: comment.Comment_author, createdAt: comment.createdAt.split('T')[0], _id: comment._id, Comment_content: comment.Comment_content, color: color })
                $commentsContainer.insertAdjacentHTML('beforeend', html)
            })
            // console.log(data)
        })


    // add comments
    document.querySelector('#postComment').addEventListener('click', () => {
        let article_Id = window.location.href.split('/')[window.location.href.split('/').length - 1]
        let name = document.querySelector('#name').value
        let reply = document.querySelector('#message').value

        let commentbody = {
            Comment_author: name,
            Comment_content: reply,
            Comment_of: article_Id
        }
        fetch('/addPcomment', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(commentbody), // body data type must match "Content-Type" header
        }).then((res) => {
            // console.log(res)
            return res.json()
        })
            .then((data) => {
                console.log(data)
                document.querySelector('#message').insertAdjacentHTML('afterend', "comment added successfully")
                document.querySelector('#message').setAttribute('style', 'display:none')
            })
        // console.log('clcic', window.location.href.split('/')[window.location.href.split('/').length - 1])
    })


})