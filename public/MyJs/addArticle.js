$(document).ready(() => {
    const $addArticle = document.querySelector('#PublishArticle')
    const $errormessage = document.querySelector('#failureArticle')
    const $successmessage = document.querySelector('#successArticle')
    const now = new Date()
    $addArticle.addEventListener('click', () => {


        // Upload picture
        const file = new FormData()
        const filedata = document.querySelector('#Article-Picture').files[0]
        file.append('ArticlePicture', filedata)
        console.log(file)

        fetch('/uploadPic', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.

                headers: {
                    'Accept': 'application/json'
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                referrer: "no-referrer", // no-referrer, *client
                body: file // body data type must match "Content-Type" header
            }).then((res) => {
                console.log(res)
                return res.json()
            })
            .then((data) => {
                console.log(data)
                if (data.failure) {
                    console.log('failure')
                } else {
                    // if pic uploads save to database 
                    const $articleTopic = document.querySelector('#Article-Topic').value
                    const $authorName = document.querySelector('#Author-Name').value
                    const $articleTitle = document.querySelector('#Article-Title').value
                    const $articlePicture = data.file.filename
                    const $articleContent = document.querySelector('#Article-Content').value

                    const articleBody = {
                        Article_topic: $articleTopic,
                        Author_name: $authorName,
                        Article_title: $articleTitle,
                        Article_picture: $articlePicture,
                        Article_content: $articleContent,
                        Article_date: now.toDateString(),
                        Article_views: 0
                    }
                    console.log(articleBody)
                    fetch('/addPost', {
                            method: "POST", // *GET, POST, PUT, DELETE, etc.

                            headers: {
                                "Content-Type": "application/json",
                                // "Content-Type": "application/x-www-form-urlencoded",
                            },
                            referrer: "no-referrer", // no-referrer, *client
                            body: JSON.stringify(articleBody), // body data type must match "Content-Type" header
                        }).then((res) => {
                            return res.json()
                        })
                        .then((data) => {
                            if (data.errors) {
                                console.log(data.message)
                                const $errormessage = document.querySelector('#failureArticle')
                                const alert = document.querySelector('#alert')
                                $errormessage.setAttribute("style", "")
                                alert.setAttribute("style", "display:none")
                                const $FailureReason = document.querySelector('#FailureReason')
                                $FailureReason.insertAdjacentHTML('beforeend', `: ${data.message}`)
                            } else {
                                const alert = document.querySelector('#alert')
                                const $errormessage = document.querySelector('#failureArticle')
                                console.log($successmessage)
                                console.log(data)
                                alert.setAttribute('style', '')
                                $errormessage.setAttribute("style", "display:none")

                                const $articleTopic = document.querySelector('#Article-Topic')
                                const $authorName = document.querySelector('#Author-Name')
                                const $articleTitle = document.querySelector('#Article-Title')
                                const $articlePicture = document.querySelector('#Article-Picture')
                                const $articleContent = document.querySelector('#Article-Content')
                                document.querySelectorAll('.input-group-icon').forEach((icon) => {
                                    icon.setAttribute("style", "display:none")
                                })
                                $articleTopic.setAttribute("style", "display:none")
                                $authorName.setAttribute("style", "display:none")
                                $articleTitle.setAttribute("style", "display:none")
                                $articlePicture.setAttribute("style", "display:none")
                                $articleContent.setAttribute("style", "display:none")
                                $addArticle.setAttribute("style", "display:none")
                            }

                        })
                    console.log('not failure')
                }

            })

    })


})