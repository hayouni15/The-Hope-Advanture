$(document).ready(()=>{
    
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
                console.log(typeof (Array.from(data)))
                Object.values(data).forEach((Onearticle) => {
                    const $articleContainer = document.querySelector('.widget_title')
                    var articleTemplate = popularPosts
                    const html = Mustache.render(articleTemplate, { Article_title: Onearticle.Article_title, Article_content: Onearticle.Article_content, Article_topic: Onearticle.Article_topic, Author_name: Onearticle.Author_name, Article_picture: Onearticle.Article_picture, Article_date: Onearticle.Article_date, Article_views: Onearticle.Article_views, id: Onearticle._id })
                    $articleContainer.insertAdjacentHTML('afterend', html)
                })
            }
        })


})