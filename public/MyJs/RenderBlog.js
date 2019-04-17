$(document).ready(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const limit = 3
    const page = parseInt(urlParams.get('page'))
    const topic = urlParams.get('topic')
    const skip = 3 * page
    const pager1 = document.querySelector('#pager1')
    const pager2 = document.querySelector('#pager2')
    const pager3 = document.querySelector('#pager3')
    const pager4 = document.querySelector('#pager4')
    const pager5 = document.querySelector('#pager5')
    const pager6 = document.querySelector('#pager6')
    pager1.setAttribute('class', 'page-item')
    pager2.setAttribute('class', 'page-item')
    pager3.setAttribute('class', 'page-item')
    pager4.setAttribute('class', 'page-item')
    pager5.setAttribute('class', 'page-item')
    pager6.setAttribute('class', 'page-item')
    switch (page) {
        case 0:
            pager1.setAttribute('class', 'page-item active')
            break;
        case 1:
            pager2.setAttribute('class', 'page-item active')
            break;
        case 2:
            pager3.setAttribute('class', 'page-item active')
            break;
        case 3:
            pager4.setAttribute('class', 'page-item active')
            break;
        case 4:
            pager5.setAttribute('class', 'page-item active')
            break;
        case 5:
            pager6.setAttribute('class', 'page-item active')
            break;
        default:
            pager6.setAttribute('class', 'page-item active')
            break;
    }


    document.querySelector('#next').addEventListener('click', () => {
        window.open(`/blog?page=${page + 1}&&topic=${topic}`, '_self')
    })
    document.querySelector('#pager1').addEventListener('click', () => {
        window.open(`/blog?page=${0}&&topic=${topic}`, '_self')
    })
    document.querySelector('#pager2').addEventListener('click', () => {
        window.open(`/blog?page=${1}&&topic=${topic}`, '_self')
    })
    document.querySelector('#pager3').addEventListener('click', () => {
        window.open(`/blog?page=${2}&&topic=${topic}`, '_self')
    })
    document.querySelector('#pager4').addEventListener('click', () => {
        window.open(`/blog?page=${3}&&topic=${topic}`, '_self')
    })
    document.querySelector('#pager5').addEventListener('click', () => {
        window.open(`/blog?page=${4}&&topic=${topic}`, '_self')
    })
    document.querySelector('#prev').addEventListener('click', () => {
        window.open(`/blog?page=${page > 0 ? page - 1 : page}&&topic=${topic}`, '_self')
    })
    fetch(`/articles/${skip}/${limit}/${topic}`, {
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
                Object.values(data).forEach(async (Onearticle) => {

                    await fetch('/getFlickerimages', {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.

                        headers: {
                            "Content-Type": "application/json",
                            // "Content-Type": "application/x-www-form-urlencoded",
                        },
                        referrer: "no-referrer", // no-referrer, *client
                        body: JSON.stringify({ picture: Onearticle.Article_picture }), // body data type must match "Content-Type" header
                    }).then((res) => {
                        console.log(res)
                        return res.json()
                    })
                        .then((data) => {
                            const picURL= `https://live.staticflickr.com/${data.photo[0].server}/${data.photo[0].id}_${data.photo[0].secret}.${data.photo[0].title.split('.')[1]}`
                            console.log(data)
                            console.log(Onearticle)
                            const $articleContainer = document.querySelector('.blog_left_sidebar')
                            var articleTemplate = article
                            const html = Mustache.render(articleTemplate, { Article_title: Onearticle.Article_title, Article_content: Onearticle.Article_content, Article_topic: Onearticle.Article_topic, Author_name: Onearticle.Author_name, Article_picture: picURL, Article_date: Onearticle.Article_date, Article_views: Onearticle.Article_views, id: Onearticle._id })
                            $articleContainer.insertAdjacentHTML('afterbegin', html)
                        })
                })
            }
        })

    // Popular posts

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
                     fetch('/getFlickerimages', {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.

                        headers: {
                            "Content-Type": "application/json",
                            // "Content-Type": "application/x-www-form-urlencoded",
                        },
                        referrer: "no-referrer", // no-referrer, *client
                        body: JSON.stringify({ picture: Onearticle.Article_picture }), // body data type must match "Content-Type" header
                    }).then((res) => {
                        console.log(res)
                        return res.json()
                    })
                        .then((data) => {
                            const picURL= `https://live.staticflickr.com/${data.photo[0].server}/${data.photo[0].id}_${data.photo[0].secret}.${data.photo[0].title.split('.')[1]}`
                            console.log(data)
                            const $articleContainer = document.querySelector('.widget_title')
                            var articleTemplate = popularPosts
                            const html = Mustache.render(articleTemplate, { Article_title: Onearticle.Article_title, Article_content: Onearticle.Article_content, Article_topic: Onearticle.Article_topic, Author_name: Onearticle.Author_name, Article_picture: picURL, Article_date: Onearticle.Article_date, Article_views: Onearticle.Article_views, id: Onearticle._id })
                            $articleContainer.insertAdjacentHTML('afterend', html)
                        })

                  
                })
            }
        })



})