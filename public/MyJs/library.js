$(document).ready(async() => {
    await fetch('/getPictures/first', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': 'application/json'
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        referrer: "no-referrer", // no-referrer, *client
        // body: file // body data type must match "Content-Type" header
    }).then((res) => {
        console.log(res)
        return res.json()
    }).then((data)=>{
        data.forEach((element)=>{
            console.log(element)

                var OnePicture = picture
                const html = Mustache.render(OnePicture, {
                    Picture_name:element.Picture_name
                })
                document.querySelector('.gallery-item').insertAdjacentHTML('afterbegin',html)
        })

    })

    await fetch('/getGalleryList', {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json'
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            referrer: "no-referrer", // no-referrer, *client
            // body: file // body data type must match "Content-Type" header
        }).then((res) => {
           // console.log(res)
            return res.json()
        })
        .then((data) => {
            // console.log(data)
            var counter=0
            data.forEach(element => {
               // console.log(element)
                counter++
                const $gallerylistContainer = document.querySelector('#appendafter')
                var gallerylistTemplate = gallerylist
                const html = Mustache.render(gallerylistTemplate, {
                    Gallery_Title: element.Gallery_Title,
                    About_Gallery:element.About_Gallery ,
                    Pictures_number: element.Pictures_number,
                    Gallery_place:element.Gallery_place,
                    colornumber:counter%8,
                    barwidth:element.Pictures_number*100/30
                })
                $gallerylistContainer.insertAdjacentHTML('afterend', html)
            });
        })

      
 
        // open gallery button
        const $opengallery=document.querySelector('.opengallery')
        $('div.opengallery').click(function(){
          //  alert($(this).attr("name"));
            window.open(`/singlelibrary?gallery=${$(this).attr("name")}`, '_blank');
    })

  
})
