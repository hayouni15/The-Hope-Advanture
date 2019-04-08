$(document).ready(() => {
    const $addGallery = document.querySelector('#AddGallery')
    const $GalleryTitle = document.querySelector('#GalleryTitle')
    const $GalleryPlace = document.querySelector('#GalleryPlace')
    const $aboutGallery = document.querySelector('#aboutGallery')

    $addGallery.addEventListener('click', async () => {
        const file = new FormData()
        var filedata = []
        filedata = document.querySelector('#GalleryPictures').files
        const Gallery_size = filedata.length
        for (let i = 0; i < filedata.length; i++) {
            //console.log(filedata[i])
            file.append('GalleryPictures', filedata[i])
        }
        await fetch('/uploadGallery', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Accept': 'application/json'
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                referrer: "no-referrer", // no-referrer, *client
                body: file // body data type must match "Content-Type" header
            }).then((res) => {
                //  console.log(res)
                return res.json()
            })
            .then((data) => {
                console.log(data)
                if (data.failure) {
                    return console.log(data.message)
                }
                data.filename.forEach(image => {
                    console.log(image)
                    const Gallery = {
                        Gallery_Title: $GalleryTitle.value.trim(),
                        Gallery_place: $GalleryPlace.value.trim(),
                        Picture_name: image.filename
                    }
                    fetch('/addGallery', {
                            method: "POST", // *GET, POST, PUT, DELETE, etc.
                            headers: {
                                "Content-Type": "application/json",
                                // "Content-Type": "application/x-www-form-urlencoded",
                            },
                            referrer: "no-referrer", // no-referrer, *client
                            body: JSON.stringify(Gallery), // body data type must match "Content-Type" header
                        }).then((res) => {
                            //  console.log(res)
                            return res.json()
                        })
                        .then((data) => {
                            // console.log(data)
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
                                alert.setAttribute('style', '')
                                const $errormessage = document.querySelector('#failureArticle')
                                $errormessage.setAttribute("style", "display:none")

                                document.querySelectorAll('.input-group-icon').forEach((icon) => {
                                    icon.setAttribute("style", "display:none")
                                })
                                document.querySelector('#aboutGallery').setAttribute("style", "display:none")
                                $GalleryTitle.setAttribute("style", "display:none")
                                $GalleryPlace.setAttribute("style", "display:none")
                                $addGallery.setAttribute("style", "display:none")
                            }
                        })
                });

            })
        console.log('after')
        const GalleryList = {
            Gallery_Title: $GalleryTitle.value.trim(),
            Gallery_place: $GalleryPlace.value.trim(),
            Pictures_number: filedata.length,
            About_Gallery:$aboutGallery.value
        }
        console.log(GalleryList)
        await fetch('/addGalleryList', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify(GalleryList), // body data type must match "Content-Type" header
            }).then((res) => {
                //  console.log(res)
                return res.json()
            })
            .then((data) => {
                // console.log(data)
                if (data.errors) {
                    console.log(data.message)
                   
                } else {
                   console.log('gallery list updated')
                }
            })


    })

})